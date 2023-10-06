const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {

        const queue = player.getQueue(message.guild.id);
        
        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        if (!queue.previousTracks[1]) return message.channel.send(`<:redx:1001554260862963733>` + ` Nothing to play before this song.`);

        await queue.back();

        message.channel.send({ content: `<:tick:1002623873575039016> Playing the previous track.` });
    },
};