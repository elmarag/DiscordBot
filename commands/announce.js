const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'Creates a new announcement.',

    execute(client, message) {
        try {
            if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
                let rest_of_the_string = message.content.slice('!announce'.length); //removes the first part
                let array_of_arguments = rest_of_the_string.split(/\r\n|\r|\n/); //[title, description, image]
                let embedFiles = Array.from(message.attachments.values());

                if (!rest_of_the_string) {
                    message.reply('Enter a title.')
                        .then(msg => {
                            setTimeout(() => msg.delete(), 2000)
                            message.delete()
                        })
                        .catch(error => {
                            console.error('Error in handling reply:', error);
                        });
                    return;
                }

                let embed = new MessageEmbed()
                    .setTitle(array_of_arguments[0])
                    .setColor('ORANGE')
                    .setThumbnail('https://i.imgur.com/tbu3TLZ.png')

                array_of_arguments.shift();
                let description = array_of_arguments.join('\n');

                if (!description) {
                    message.reply('Enter a description.')
                        .then(msg => {
                            setTimeout(() => msg.delete(), 2000)
                            message.delete()
                        })
                        .catch(error => {
                            console.error('Error in handling reply:', error);
                        });
                    return;
                } else {
                    embed.setDescription(description)
                }

                if (embedFiles.length >= 1) {
                    let embedLink = embedFiles[0].attachment;
                    embed.setImage(embedLink)
                }

                message.channel.send({ embeds: [embed] });
                message.delete();

            } else {
                message.delete();
            }
        } catch (error) {
            console.error('An error occurred:', error);
            message.reply('An error occurred while processing the command.');
        }
    }
}
