const { QueryType } = require('discord-player');
const nowplaying = require('./nowplaying');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'play',
  aliases: ['p'],
  utilisation: '{prefix}play [song name/URL]',
  voiceChannel: true,

  async execute(client, message, args) {
    // Create an embed for invalid usage
    const invalidUsage = new MessageEmbed()
      .setColor('RED')
      .setDescription(
        '<:redx:1001554260862963733>' +
        ' **Invalid Usage**\nThe ``query`` argument is required.\n\nUsage: ``!play <song name or url>``'
      );

    // Check if the user provided arguments
    if (!args[0]) return message.channel.send({ embeds: [invalidUsage] });

    // Search for the requested song or URL
    const res = await player.search(args.join(' '), {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO,
    });

    // Check if there are search results
    if (!res || !res.tracks.length)
      return message.channel.send(`<:redx:1001554260862963733> No results found for that query.`);

    // Create a queue for the guild with specific settings
    const queue = await player.createQueue(message.guild, {
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 10000,
      leaveOnStop: true,
      leaveOnEnd: false,
      metadata: message.channel,
    });

    try {
      // Connect to the user's voice channel
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      // Handle the case when the user is not in a voice channel
      await player.deleteQueue(message.guild.id);
      return message.channel.send(
        '<:redx:1001554260862963733>' + `You aren't in a voice channel.`
      );
    }

    if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
      return message.channel.send(
        '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
      );
    }

    // Add tracks to the queue
    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    // Start playing if not already playing
    if (!queue.playing) {
      await queue.play().then((msg) => {
        //setTimeout(() => console.log(queue.tracks[0]), 10000);
      });
    } else if (queue.playing) {
      // Send a message when a track is added to the queue
      const queueEmbed = new MessageEmbed()
        .setColor('BLACK')
        .setTitle('**Added to queue**')
        .setDescription(
          `[${res.tracks[0].title}](${res.tracks[0].url})\n\nRequested by: ${res.tracks[0].requestedBy}`
        )
        .setThumbnail(res.tracks[0].thumbnail);

      await message.channel.send({ embeds: [queueEmbed] });
    }

    client.on('voiceStateUpdate', async (oldState, newState) => {
      // Check if the member is the bot
      if (newState.member.user.bot) {
        // Check if the bot was previously in a voice channel (oldState.channel) and is now not in any channel (newState.channel)
        if (oldState.channel && !newState.channel) {
          // The bot was manually disconnected from a voice channel.
          // Retrieve the guild ID from newState.guild.id and delete the queue associated with it.
          const guildId = newState.guild.id;

          // Check if the queue exists before attempting to delete it
          const queue = player.getQueue(guildId);
          if (queue) {
            try {
              // Delete the queue associated with the guild
              await player.deleteQueue(guildId);
              //console.log(`${newState.member.user.tag} manually disconnected from voice channel.`);
            } catch (error) {
              // Handle any errors that may occur during queue deletion
              console.error(`Error deleting queue for guild ${guildId}: ${error.message}`);
            }
          }
        }
      }
    });
  },
};

// Event handler for voice connection creation
player.on('connectionCreate', (queue) => {
  // Handle voice connection state changes
  queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, 'networking');
    const newNetworking = Reflect.get(newState, 'networking');

    // Handle network state changes
    const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
      const newUdp = Reflect.get(newNetworkState, 'udp');
      clearInterval(newUdp?.keepAliveInterval);
    };

    oldNetworking?.off('stateChange', networkStateChangeHandler);
    newNetworking?.on('stateChange', networkStateChangeHandler);
  });
});


// Event handler for track start
player.on('trackStart', (queue, track) => {
  // Create an embed for the currently playing track
  const nowPlayingEmbed = new MessageEmbed()
    .setColor('ORANGE')
    .setTitle('**Now Playing**')
    .setDescription(
      `[${track.title}](${track.url})\n\`\`[0:00 / ${track.duration}]\`\`\n\nRequested by: ${track.requestedBy
      }`
    )
    .setThumbnail(track.thumbnail);

  // Get the channel for metadata and send the now playing message
  const channel = queue.metadata;
  if (channel && channel.isText()) {
    channel.send({ embeds: [nowPlayingEmbed] });
  }
});
