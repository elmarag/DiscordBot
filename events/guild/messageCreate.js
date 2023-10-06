require('dotenv').config();
const { MessageEmbed } = require('discord.js')
module.exports = {
   async run(client, message, Discord) {
        //console.log(message)
        const prefix = process.env.PREFIX;
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = message.client.commands.get(cmd);

        if (command) command.execute(client, message, args, Discord);

        //-----------------------------------------------------------------------
        //Command Logs
        const channel = client.channels.cache.get('1001545042831356036')

        const embed6 = new MessageEmbed()
            //.setAuthor(cmdMessage.guild.name)
            .setColor('ORANGE')
            .setTitle(`Command Triggered: ${cmd}`)
            .setDescription(`Triggered by: <@${message.author.id}>`)

        if (command) channel.send({ embeds: [embed6] });

        //-----------------------------------------------------------------------
        
    }
}       