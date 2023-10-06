const { MessageEmbed } = require('discord.js')
module.exports = {
    run(client, deletedChannel) {
        const channel = client.channels.cache.get('1001544995767062551')
        ticketType = ['support', 'donate', 'report', 'staff-report']
        if (ticketType.some(type => deletedChannel.name.startsWith(`${type}-ticket-`))) {
            return;
        }
        const embed3 = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`**Channel Delete Logs**`)
            .setDescription(`**Channel Deleted : \`\`\`${deletedChannel.name} \`\`\`**`)
            .setAuthor(deletedChannel.guild.name, deletedChannel.guild.iconURL())
            .setTimestamp()
        channel.send({ embeds: [embed3] })
    }
}