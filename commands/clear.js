module.exports = {
    name: 'clear',
    description: 'this is a ping command',
    async execute(client, message, args) {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {

            let input1 = parseInt(args[0]);

            if (!input1) return message.reply('Specify amount to be cleared.');

            if (isNaN(input1)) return message.reply('Enter a real number');

            if (input1 > 100) return message.reply('No more than 100');
            if (input1 < 1) return message.reply('No less than 1');
    

            const allMessages = await message.channel.messages.fetch({ limit: input1 });
            const deletable = allMessages.filter(message => !message.pinned);
            await message.channel.bulkDelete(deletable, true);
            
        }else{
            message.delete();
        }
    }
}