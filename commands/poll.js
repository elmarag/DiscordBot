const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll!',
    execute(client, message, args) {
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            // Find the polls channel dynamically by name
            const channel = message.guild.channels.cache.find(ch => ch.name === 'polls');

            // Check if the polls channel exists
            if (!channel) {
                return message.reply({ content: 'Polls channel does not exist!', ephemeral: true })
                    .then(reply => {
                        setTimeout(() => {
                            reply.delete();
                        }, 2000); // Delete the reply after two seconds
                    });
            }

            // Combine the message arguments into a single string, trimming extra whitespace
            const pollQuestion = args.join(' ').trim();

            // Check if the user provided a poll question
            if (!pollQuestion) {
                return message.reply({ content: 'Please provide a poll question!', ephemeral: true })
                    .then(reply => {
                        setTimeout(() => {
                            reply.delete();
                        }, 2000); // Delete the reply after two seconds
                    });
            }

            // Create a new embed for the poll
            const newEmbed = new MessageEmbed()
                .setColor('FADF2E')
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setTitle('Poll:')
                .setDescription(pollQuestion);

            // Send the embed and add reactions
            channel.send({ embeds: [newEmbed] }).then((msg) => {
                msg.react('✅');
                msg.react('❌');
                message.delete();
            });
        } else {
            message.delete();
        }
    },
};
