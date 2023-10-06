const { MessageEmbed } = require('discord.js')

module.exports = {
    async run(client, oldState, newState) {
        //On Duty Staff Logs
        const channel = client.channels.cache.get('1001545065237327964')
        if (newState.channelId === "1001544364624986166") {

            const embed = new MessageEmbed()
                .setAuthor(newState.guild.name, newState.guild.iconURL())
                .setColor('ORANGE')
                .setTitle(`On Duty Staff`)
                .setDescription(`${newState.member} joined On Duty Staff`)

            channel.send({ embeds: [embed] });

        }
    }
}