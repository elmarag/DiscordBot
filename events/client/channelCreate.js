const { MessageEmbed } = require('discord.js')

module.exports = {
    run(client, channel) {
        const ncLog = client.channels.cache.get('963137766999334942')
        ticketType = ['support', 'donate', 'report', 'staff-report']
        if (ticketType.some(type => channel.name.startsWith(`${type}-ticket-`))) {
            return;
        }
        const embed3 = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`**Channel Create Logs**`)
            .setDescription(`**New Channel: \`\`\`${channel.name} \`\`\`**`)
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setTimestamp()
        ncLog.send({ embeds: [embed3] })
    }
}