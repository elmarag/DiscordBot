const Discord = require('discord.js');
const { client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { MessageMenuOption } = require('discord.js');

module.exports = {
    name: "ticket",
    description: 'open a ticket',
    execute: async (client, message, args, cmd, Discord) => {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('ticketMenu')
                        .setPlaceholder('Ticket Menu')
                        .addOptions([
                            {
                                label: 'Support Ticket',
                                description: 'Creates a support ticket',
                                value: 'first',
                            },
                            {
                                label: 'Donation Ticket',
                                description: 'Creates a donation ticket',
                                value: 'second_option',
                            },
                            {
                                label: 'Report',
                                description: 'Creates a report ticket',
                                value: 'third_option',
                            },
                            {
                                label: 'Staff Report',
                                description: 'Creates a staff report ticket',
                                value: 'fourth_option',
                            },
                        ]),
                );

            let embed = new MessageEmbed()
                .setTitle('Ticket System')
                .setDescription('Please select the type of ticket you want to open.')
                .setColor('ORANGE')
                .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

            await message.channel.send({ ephemeral: true, embeds: [embed], components: [row] }).then((msg) => { message.delete() });
        } else {
            message.delete()
        }
    }
}