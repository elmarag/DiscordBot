module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
          return message.channel.send(
            '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
          );
        }

        
        queue.destroy();
        
        message.channel.send(`<:tick:1002623873575039016> Stopped music playback and left the voice channel.`);
    },
};