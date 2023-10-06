const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Define constants for channel IDs and role names
const TICKET_CATEGORY_ID = '1001545693858639872';
const LOG_TICKET_CHANNEL_ID = '1001544974724255774';
const STAFF_ROLE_NAME = 'Staff';

// Function to create a ticket
async function createTicket(interaction, ticketType) {
    const ticketChannelName = `${ticketType}-ticket-${interaction.user.username}`;
    const channel = interaction.guild.channels.cache.find(c => c.name.toLowerCase() === ticketChannelName);

    if (channel) {
        const existEmbed = new MessageEmbed()
            .setTitle('Couldn\'t create a channel.')
            .setDescription(`You already have a ${ticketType} ticket. ${channel}`)
            .setColor('ORANGE')
            .setThumbnail('https://media3.giphy.com/media/3PGttul40n3WeB8JTl/giphy.gif?cid=790b7611b2363de7d8258cb342ed38dca93db25b23e7a00d&rid=giphy.gif&ct=g');
        interaction.reply({ embeds: [existEmbed], ephemeral: true });
        return;
    }

    try {
        const ticketChannel = await interaction.guild.channels.create(`${ticketType}-ticket-${interaction.user.username}`);
        ticketChannel.setParent(TICKET_CATEGORY_ID);


        setTimeout(() => {
            // Allow only the user who opened the ticket to send messages
            ticketChannel.permissionOverwrites.edit(interaction.user.id, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
            });

            // Deny others from sending messages
            ticketChannel.permissionOverwrites.edit(interaction.guild.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            });
        }, 1000)

        const embed = new MessageEmbed()
            .setTitle(`${ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} Ticket`)
            .setDescription(`Here is your ${ticketType} ticket: ${ticketChannel}`)
            .setColor('ORANGE')
            .setThumbnail('https://media3.giphy.com/media/3PGttul40n3WeB8JTl/giphy.gif?cid=790b7611b2363de7d8258cb342ed38dca93db25b23e7a00d&rid=giphy.gif&ct=g');

        setTimeout(() => {
            interaction.reply({ embeds: [embed], ephemeral: true });
        }, 1500)


        // Ticket Open Log
        const logTicketChannel = interaction.client.channels.cache.get(LOG_TICKET_CHANNEL_ID);
        const newSupportTicket = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Ticket Opened')
            .setAuthor(`${interaction.guild.name}`)
            .setDescription(`**@${interaction.user.tag}** opened a ${ticketType} ticket.`)
            .addFields({
                name: 'Ticket Name',
                value: `${ticketChannel}`,
            });

        logTicketChannel.send({ embeds: [newSupportTicket] });

        const embedTicket = new MessageEmbed()
            .setTitle(`${ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} Ticket`)
            .setDescription(`${interaction.user}, please describe your problem, and the first staff member available will reply.`)
            .setColor('ORANGE')
            .setThumbnail('https://media3.giphy.com/media/3PGttul40n3WeB8JTl/giphy.gif?cid=790b7611b2363de7d8258cb342ed38dca93db25b23e7a00d&rid=giphy.gif&ct=g');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('lockticket')
                    .setLabel('Lock Ticket')
                    .setStyle('PRIMARY')
                    .setEmoji('🔒')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('unlockticket')
                    .setLabel('Unlock Ticket')
                    .setStyle('SUCCESS')
                    .setEmoji('🔓')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('closeticket')
                    .setLabel('Close Ticket')
                    .setStyle('DANGER')
                    .setEmoji('⛔')
            );




        await ticketChannel.send({ embeds: [embedTicket], components: [row] }).then((msg) => msg.pin());
    } catch (error) {
        console.error(`Error in creating ${ticketType} ticket: ${error.message}`);
        interaction.reply({ content: 'An error occurred while creating the ticket.', ephemeral: true });
    }
}


module.exports = {
    async run(client, interaction) {
        // Ticket Handler Start
        if (interaction.customId === 'ticketMenu') {
            if (interaction.values[0] === 'first') {
                createTicket(interaction, 'support');
            } else if (interaction.values[0] === 'second_option') {
                createTicket(interaction, 'donate');
            } else if (interaction.values[0] === 'third_option') {
                createTicket(interaction, 'report');
            } else if (interaction.values[0] === 'fourth_option') {
                createTicket(interaction, 'staff-report');
            }
        }

        //Ticket Buttons

        // Close Ticket Button
        if (interaction.customId === 'closeticket') {

            //Ticket Close Log
            const logticketchannel = client.channels.cache.get('1001544974724255774');
            const newSupportTicket = new MessageEmbed()
                .setColor('ORANGE')
                .setTitle('Ticket Closed')
                .setAuthor(`${interaction.guild.name}`)
                .setDescription(`**${interaction.channel.name}** closed.`)
                .addFields(
                    {
                        name: `Closed by:`,
                        value: `<@${interaction.user.id}>`
                    });

            logticketchannel.send({ embeds: [newSupportTicket] });

            // Check if the user who clicked the button is the ticket owner or a staff member
            const isTicketOwner = interaction.user.username === interaction.channel.name.split('-').pop();
            const isStaffMember = interaction.member.roles.cache.some(r => r.name === "Staff") || interaction.member.permissions.has("ADMINISTRATOR");

            if (isTicketOwner || isStaffMember) {
                // Check if the ticket is already closed
                const isClosed = interaction.channel.name.endsWith('-closed') || interaction.channel.parentId === '1001545718701490196';

                if (isClosed) {
                    // Inform the user the ticket is already closed
                    interaction.reply({ content: 'This ticket is already closed.', ephemeral: true });
                } else {
                    // Display a closing ticket message and initiate the 5-second countdown
                    interaction.channel.send({ content: 'Closing ticket in 10 seconds...' });
                    
                    let transcript = "";
                    interaction.channel.messages.fetch().then(messages => {
                        const messagesArray = Array.from(messages.values()).reverse();
                        messagesArray.forEach(message => {
                            transcript += `${message.author.tag} (${message.createdAt}): ${message.content}\n`;
                        });

                        // Send transcript as a text file attachment
                        interaction.channel.send({
                            content: `Here's the transcript for this ticket:`,
                            files: [{
                                attachment: Buffer.from(transcript),
                                name: `transcript-${interaction.channel.name}.txt`
                            }]
                        }).then(() => {

                            setTimeout(() => {
                                // Check if the ticket name starts with "donate-"
                                if (interaction.channel.name.startsWith("donate-")) {
                                    // Get the special closed ticket category for "donate-" tickets
                                    const specialClosedCategory = interaction.guild.channels.cache.get('1153660269193601094');

                                    if (!specialClosedCategory || specialClosedCategory.type !== 'GUILD_CATEGORY') {
                                        return console.error('Special closed ticket category not found or is not a category.');
                                    }

                                    // Move the "donate-" ticket channel to the special closed ticket category
                                    interaction.channel.setParent(specialClosedCategory)
                                        .then(() => {
                                            interaction.channel.setName(`${interaction.channel.name}-closed`);
                                        })
                                        .catch(error => console.error(`Error moving "donate-" ticket channel: ${error}`));
                                } else {
                                    // If it's not a "donate-" ticket, move it to the regular closed ticket category
                                    const regularClosedCategory = interaction.guild.channels.cache.get('1001545718701490196');

                                    if (!regularClosedCategory || regularClosedCategory.type !== 'GUILD_CATEGORY') {
                                        return console.error('Regular closed ticket category not found or is not a category.');
                                    }

                                    // Move the ticket channel to the regular closed ticket category
                                    interaction.channel.setParent(regularClosedCategory)
                                        .then(() => {
                                            interaction.channel.setName(`${interaction.channel.name}-closed`);
                                        })
                                        .catch(error => console.error(`Error moving ticket channel: ${error}`));
                                }
                            }, 10000);

                        });
                    });
                    interaction.deferUpdate();
                }
            } else {
                // Inform the user they can't close the ticket
                interaction.reply({ content: 'You cannot close this ticket.', ephemeral: true });
            }
        }

        // Lock Ticket Button
        if (interaction.customId === 'lockticket') {
            // Check if the user is a staff member or has ADMINISTRATOR permission
            const isStaffMember = interaction.member.roles.cache.some(r => r.name === "Staff") || interaction.member.permissions.has("ADMINISTRATOR");
            // Get the ticket owner's ID from the channel name
            const ticketOwnerId = interaction.channel.name.split('-').pop();
            const foundUser = client.users.cache.find(user => user.username === ticketOwnerId);

            // Check if the ticket is already closed
            const isClosed = interaction.channel.name.endsWith("-closed") || interaction.channel.parentId === '1001545718701490196';

            if (isClosed) {
                interaction.reply({ content: 'This ticket is already closed.', ephemeral: true });
            } else if (isStaffMember) {
                // Check if the ticket is already locked
                const isLocked = !interaction.channel.permissionsFor(foundUser).has("SEND_MESSAGES");

                if (isLocked) {
                    interaction.reply({ content: 'This ticket is already locked.', ephemeral: true });
                } else {
                    // Iterate through members in the channel and set SEND_MESSAGES permission to false
                    interaction.channel.members.forEach((member) => {
                        interaction.channel.permissionOverwrites.edit(member.id, {
                            SEND_MESSAGES: false,
                        });
                    });

                    interaction.channel.send(`${foundUser}, your ticket has been locked.`);
                    interaction.deferUpdate();
                }
            } else {
                interaction.reply({ content: 'You cannot lock this ticket.', ephemeral: true });
            }
        }

        // Unlock Ticket Button
        if (interaction.customId === 'unlockticket') {
            // Check if the user is a staff member or has ADMINISTRATOR permission
            const isStaffMember = interaction.member.roles.cache.some(r => r.name === "Staff") || interaction.member.permissions.has("ADMINISTRATOR");
            // Get the ticket owner's ID from the channel name
            const ticketOwnerId = interaction.channel.name.split('-').pop();
            const foundUser = client.users.cache.find(user => user.username === ticketOwnerId);

            // Check if the ticket is already closed
            const isClosed = interaction.channel.name.endsWith("-closed") || interaction.channel.parentId === '1001545718701490196';

            if (isClosed) {
                interaction.reply({ content: 'This ticket is already closed.', ephemeral: true });
            } else if (isStaffMember) {
                // Check if the ticket is already unlocked
                const isUnlocked = interaction.channel.permissionsFor(foundUser).has("SEND_MESSAGES");

                if (isUnlocked) {
                    interaction.reply({ content: 'This ticket is already unlocked.', ephemeral: true });
                } else {
                    // Iterate through members in the channel and set SEND_MESSAGES permission to true
                    interaction.channel.members.forEach((member) => {
                        interaction.channel.permissionOverwrites.edit(member.id, {
                            SEND_MESSAGES: true,
                        });
                    });

                    interaction.channel.send(`${foundUser}, your ticket has been unlocked.`);
                    interaction.deferUpdate();
                }
            } else {
                interaction.reply({ content: 'You cannot unlock this ticket.', ephemeral: true });
            }
        }

        // Applications Handler
        if (interaction.customId === 'applications') {
            if (interaction.values[0] === 'staff') {
                let embed1 = new MessageEmbed()
                    .setTitle('Staff Application Link')
                    .setDescription('Click the link below to apply:\n\nhttps://forms.gle/D3oRkqQP7p4pHXjJ8')
                    .setColor('ORANGE')
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                await interaction.reply({ embeds: [embed1], ephemeral: true })
            } else if (interaction.values[0] === 'police') {
                let embed2 = new MessageEmbed()
                    .setTitle('Police Application Link')
                    .setDescription('Application Coming Soon')
                    .setColor('ORANGE')
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                await interaction.reply({ embeds: [embed2], ephemeral: true })
            } else if (interaction.values[0] === 'ems') {
                let embed3 = new MessageEmbed()
                    .setTitle('Doctor Application Link')
                    .setDescription('Application Coming Soon')
                    .setColor('ORANGE')
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

                await interaction.reply({ embeds: [embed3], ephemeral: true })
            }
        }
        // Applications Handler End

    }
}
