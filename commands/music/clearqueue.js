module.exports = {
    name: 'clearqueue',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        if (!queue.tracks[0]) return message.channel.send(`<:redx:1001554260862963733>` + ` Nothing to clear in the queue.`);

        await queue.clear();

        message.channel.send(`<:tick:1002623873575039016> Cleared queue.`);
    },
};