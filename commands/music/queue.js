const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`<:redx:1001554260862963733>` + ` I'm not playing anything.`);

        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        const track = queue.current;

        const embedCurrent = new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor(`Music Queue | ${message.guild.name}`, message.guild.iconURL({ size: 1024, dynamic: true }))
            .setDescription(`**Now Playing:** [${track.title}](${track.url})`)
            .setFooter('The queue is empty.');

        //If the queue is empty
        if (!queue.tracks[0]) return message.channel.send({ embeds: [embedCurrent] });

        const queueEmbed = new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor(`Music Queue | ${message.guild.name}`, message.guild.iconURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url})`);
        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And ${songs - 5} other song(s)...` : `In the playlist **${songs}** song(s)...`;

        queueEmbed.setDescription(`**Now Playing:** [${queue.current.title}](${queue.current.url})\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        message.channel.send({ embeds: [queueEmbed] });
    },
};