const { MessageEmbed } = require('discord.js')
module.exports = {
    run(client, or, nr) {
        const channel = client.channels.cache.get('1001544995767062551')
        ticketType = ['support', 'donate', 'report', 'staff-report']
        if (ticketType.some(type => or.name.startsWith(`${type}-ticket-`))) {
            return;
        }
        if (or.name != nr.name) {
            const embed4 = new MessageEmbed()
                .setColor('ORANGE')
                .setTitle(`**Channel Update Logs**`)
                .addField(`Old channel Name`, `\`\`\`${or.name}\`\`\``, true)
                .addField(`New channel Name`, `\`\`\`${nr.name}\`\`\``, true)
                .setAuthor(or.guild.name, or.guild.iconURL())
                .setTimestamp()
            channel.send({ embeds: [embed4] })
        }
    }
}