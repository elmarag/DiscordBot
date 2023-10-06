const Discord = require('discord.js');
const { client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { MessageMenuOption } = require('discord.js');
const { description } = require('./announce');

module.exports = {
	name: "applications",
	execute: async (client, message, args, Discord) => {
		if (message.member.roles.cache.some(r => r.name === "upper") || message.member.permissions.has("ADMINISTRATOR")) {
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('applications')
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Staff Applications',
								description: 'Click to apply for staff',
								value: 'staff',
							},
							{
								label: 'Police Applications',
								description: 'Click to apply for police',
								value: 'police',
							},
							{
								label: 'Doctor Applications',
								description: 'Click to apply for Doctor',
								value: 'ems',
							},
						]),
				);

			let embed = new MessageEmbed()
				.setTitle('Applications')
				.setDescription('Please select the application you are applying for.')
				.setColor('ORANGE')
				.setThumbnail('https://i.imgur.com/tbu3TLZ.png');

			await message.channel.send({ content: ' ', ephemeral: true, embeds: [embed], components: [row] }).then((msg) => {
				setTimeout(() => message.delete());

			});
		} else {
			message.delete()
		}
	}
}

