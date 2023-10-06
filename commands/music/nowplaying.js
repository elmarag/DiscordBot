const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        const track = queue.current;

        const nowPlayingEmbed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle("**Now Playing**")
            .setDescription(`[${track.title}](${track.url})\n[0:00 / ${track.duration}]\n\nRequested by: ${track.requestedBy}`)
            .setThumbnail(track.thumbnail)

        message.channel.send({ embeds: [nowPlayingEmbed] });
    },
};