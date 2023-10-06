module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {  
        const queue = player.getQueue(message.guild.id);
  
        if (!queue) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        const success = queue.setPaused(false);

        return message.channel.send(success ? `<:tick:1002623873575039016> Music playback has been resumed.` : `<:redx:1001554260862963733>` + ` I'm not playing anything.`);
    },
};