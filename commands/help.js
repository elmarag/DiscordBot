const { MessageEmbed, MessageAttatchment } = require('discord.js');
module.exports = {
    name: 'help',
    permissions: ['ADMINISTRATOR'],
    description: 'Shows a board with all the commands!',

    execute(client, message, args, Discord) {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            let commandName = args[0];
            if (commandName === "announce") {
                const announceEmbed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('!announce usage can be found below.')
                    .addFields(
                        { name: 'Usage:\n', value: '!announce <title>\n<description> \n\nand press enter to send without image or attatch an image to send with the announcement. ' },
                    )
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                message.channel.send({ embeds: [announceEmbed] });
            } else if (commandName === 'poll') {
                const pollEmbed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('!poll usage can be found below.')
                    .addFields(
                        { name: 'Usage:\n', value: '!poll <enter your poll here.> ' },
                    )
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                message.channel.send({ embeds: [pollEmbed] });
            } else if (commandName === 'ticket') {
                const ticketEmbed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('!ticket-add/!ticket-remove usage can be found below.')
                    .addFields(
                        { name: 'Usage:\n', value: '!ticket-add <@user> ' },
                        { name: 'Usage:\n', value: '!ticket-remove <@user> ' }
                    )
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                message.channel.send({ embeds: [ticketEmbed] });
            } else {
                //Create new embed
                const newEmbed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('Commands List')
                    .setDescription('Find a list with all possible commands below.\nPrefix: !')
                    .addFields(
                        { name: 'help', value: 'Shows the commands list. !help <command>.' },
                        { name: 'clear', value: 'Clears messages of past 14 days. Clear up to 100 messages at once.' },
                        { name: 'kick', value: 'Kicks a member.' },
                        { name: 'ban', value: 'Bans a member.' },
                        { name: 'announce', value: 'Makes a new announcement.' },
                        { name: 'ticket', value: 'Creates a new ticket menu' },
                        { name: 'applications', value: 'Creates a new applications menu' },
                        { name: 'suggest', value: 'Creates a new suggestion' },
                        { name: 'poll', value: 'Creates a new poll.' }

                    )
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                message.channel.send({ embeds: [newEmbed] });
            }
        } else {
            message.delete();
        }
    }
}