const { MessageEmbed } = require('discord.js')
const moment = require('moment');

module.exports = {
    async run(client, member) {

        //-----------------------------------------------------------------------------------------------
        
        //Leave Logs
        const channel = client.channels.cache.get('1001544964758585435')
        const embed2 = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Member Left')
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setDescription(`**${member.displayName}** left the server.`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                {
                    name: `User ping`,
                    value: `<@${member.id}>`
                }
            )
            .addFields(
                {
                    name: `User ID`,
                    value: `${member.id}`
                }
            )
            .addFields(
                {
                    name: 'Left server',
                    value: moment(member.joinedAt).format('LLLL')
                }
            )
        channel.send({ embeds: [embed2] })

        //----------------------------------------------------

        //Kick Logs
        const kickLogchannel = client.channels.cache.get('1001545078944305192')

        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const kickLog = fetchedLogs.entries.first();

        // Perform a coherence check to make sure that there's *something*
        if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

        // We now grab the user object of the person who kicked our member
        // Let us also grab the target of this action to double check things
        const { executor, target } = kickLog;


        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same kicked member
        if (target.id === member.id) {
            const kickembed = new MessageEmbed()
                .setAuthor(member.guild.name, member.guild.iconURL())
                .setColor('ORANGE')
                .setTitle(`Kick Logs`)
                .setDescription(`${executor.tag} has kicked ${member.user.tag} `)

            kickLogchannel.send({ embeds: [kickembed] });
            //console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
        } else {
            console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
        }

        
    }
}