module.exports = {
    name: 'kick',
    permissions: ['KICK_MEMBERS'],
    description: 'Command to kick a member.',

    execute(client, message, args) {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            const member = message.mentions.users.first();
            if (!member || !member.kickable) {
                message.delete()
                return;
            } else if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send('User has been kicked.').then((msg) => { message.delete() });
            } else {
                message.channel.send('Cant kick member.').then((msg) => { message.delete() });
            }
        } else {
            message.delete();
        }
    }
}