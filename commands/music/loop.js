const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
          
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }
        
        //Loop the queue
        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`<:redx:1001554260862963733> Disable the song loop first.`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `<:tick:1002623873575039016> Loop has been ${queue.repeatMode === 0 ? 'disabled' : 'enabled'}.` : `<:redx:1001554260862963733>` + ` I'm not playing anything.`);
        } else {
            //Loop the song
            if (queue.repeatMode === 2) return message.channel.send(`<:redx:1001554260862963733> Disable the queue loop first.`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `<:tick:1002623873575039016> Loop has been ${queue.repeatMode === 0 ? 'disabled' : 'enabled'}.` : `<:redx:1001554260862963733>` + ` I'm not playing anything.`);
        };
    },
};