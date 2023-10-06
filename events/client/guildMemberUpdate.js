const { MessageEmbed } = require('discord.js')

module.exports = {
    async run(client, oldMember, newMember) {
        const channel = client.channels.cache.get('1001545031007613019')
        let oldRoleIDs = [];
        oldMember.roles.cache.each(role => {
            //console.log(role.name, role.id);
            oldRoleIDs.push(role.id);
        });
        let newRoleIDs = [];
        newMember.roles.cache.each(role => {
            //console.log(role.name, role.id);
            newRoleIDs.push(role.id);
        });
        //check if the newRoleIDs had one more role, which means it added a new role
        if (newRoleIDs.length > oldRoleIDs.length) {
            function filterOutOld(id) {
                for (var i = 0; i < oldRoleIDs.length; i++) {
                    if (id === oldRoleIDs[i]) {
                        return false;
                    }
                }
                return true;
            }
            let onlyRole = newRoleIDs.filter(filterOutOld);

            let IDNum = onlyRole[0];
            //fetch the link of the icon name
            //NOTE: only works if the user has their own icon, else it'll return null if user has standard discord icon
            let icon = newMember.user.displayAvatarURL();

            const newRoleAdded = new MessageEmbed()
                .setTitle('Role added')
                .setAuthor(`${newMember.user.tag}`, `${icon}`)
                .setDescription(`<@&${IDNum}>`)
                .setFooter(`ID: ${IDNum}`)
                .setTimestamp()
            channel.send({ embeds: [newRoleAdded] })
        }
    }
}