module.exports = {
    name: 'ban',
    permissions: ['KICK_MEMBERS'],
    description: 'Command to ban a member.',

    execute(client, message, args) {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            const member = message.mentions.users.first();
            if (!member || !member.kickable) {
                message.delete();
                return;
            } else if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban();
                message.channel.send('User has been banned.').then((msg) => { message.delete() });
            } else {
                message.channel.send('Please define a valid user.').then((msg) => { message.delete() });
            }
        } else {
            message.delete();
        }
    }
}
