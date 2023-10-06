module.exports = {
    name: 'ticket-add',
    description: 'Adds a user to the ticket',

    async execute(client, message, Discord) {
        // Check if the user who sent the command is a staff member or has ADMINISTRATOR permission
        if (
            message.member.roles.cache.some(r => r.name === "Staff") ||
            message.member.permissions.has("ADMINISTRATOR")
        ) {
            // Check if there's a mention of a user in the message
            const mentionedUser = message.mentions.users.first();
            const ticketChannel = message.channel;

            if (!mentionedUser) {
                // If no user is mentioned, inform the user how to use the command
                message.reply("Please mention a user to add to the ticket.");
                return;
            }

            // Add permissions for the mentioned user to view and send messages in the ticket channel
            try {
                await ticketChannel.permissionOverwrites.edit(mentionedUser, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                });

                message.reply(`${mentionedUser} has been added to the ticket.`);
            } catch (error) {
                console.error(`Error adding user to ticket: ${error}`);
                message.reply("An error occurred while adding the user to the ticket.");
            }
        } else {
            // If the user doesn't have the required role or permissions, inform them
            message.reply("You do not have permission to use this command.");
        }
    },
};