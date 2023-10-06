const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Create a suggestion!',
    execute(client, message, args) {
        // Check if the user has the "upper" role or is an administrator
        if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
            // Find the suggestion channel dynamically by name
            const channel = message.guild.channels.cache.find(ch => ch.name === 'suggestions');

            // Check if the suggestion channel exists
            if (!channel) {
                message.delete()
                return message.reply({ content: 'Suggestions channel does not exist!', ephemeral: true })
                    .then(reply => {
                        setTimeout(() => {
                            reply.delete();
                        }, 2000); // Delete the reply after two seconds
                    });
            }

            // Combine the message arguments into a single string, trimming extra whitespace
            const suggestion = args.join(' ').trim();

            // Check if the suggestion is empty
            if (!suggestion) {
                return message.delete();
            }

            // Create a new embed for the suggestion
            const newEmbed = new MessageEmbed()
                .setColor('FADF2E')
                .setAuthor('', message.author.displayAvatarURL({ dynamic: true }))
                .setTitle('Suggestion:')
                .setDescription(`${message.author.toString()} - ${suggestion}`)
                .setThumbnail('https://i.imgur.com/tbu3TLZ.png');

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
