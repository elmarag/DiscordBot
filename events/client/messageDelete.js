const { MessageEmbed } = require('discord.js')

module.exports = {
    run(client, message) {
        const channel = client.channels.cache.get('1001545022707073155')
        if (message.deleted === true) {
            if (message.content.length === 0) return;
            const embed5 = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setColor('ORANGE')
                .addField(`Message :`, ` \`\`\`${message.content} \`\`\``, true)
                .addField(`Message By`, ` ${message.author.username}`, true)
            channel.send({ embeds: [embed5] })
        }
    }
}