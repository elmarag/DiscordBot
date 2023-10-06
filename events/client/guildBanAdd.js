const { MessageEmbed } = require('discord.js')

module.exports = {
    async run(client, ban) {

        const channel = client.channels.cache.get('1001545086489874624')
        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const banLog = fetchedLogs.entries.first();

        // Perform a coherence check to make sure that there's *something*
        if (!banLog) return console.log(`${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`);

        // Now grab the user object of the person who banned the member
        // Also grab the target of this action to double-check things
        const { executor, target } = banLog;

        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same banned member
        if (target.id === ban.user.id) {
            const embed = new MessageEmbed()
                .setAuthor(ban.guild.name, ban.guild.iconURL())
                .setColor('ORANGE')
                .setTitle(`Ban Logs`)
                .setDescription(`${executor.tag} has banned ${ban.user.tag} `)

            channel.send({ embeds: [embed] });
            //console.log(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, wielded by the mighty ${executor.tag}`);
        } else {
            console.log(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`);
        }
    }
}