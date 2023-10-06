const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        // if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
        //     return message.channel.send(
        //         '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
        //     );
        // }
        if (!queue || !queue.playing){
            return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`); 
        }else{
            const success = queue.skip();
            return message.channel.send({content: 'Song skipped! <:tick:1002623873575039016>'});
        }    
    },
};