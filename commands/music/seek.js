const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        // Get the queue for the guild
        const queue = player.getQueue(message.guild.id);
     
        // Check if the queue is empty or not playing
        if (!queue || !queue.playing) return message.channel.send('<:redx:1001554260862963733>' + ` I'm not playing anything.`);

        // Check if the user is in the same voice channel as the bot
        if (message.member.voice.channelId !== queue.connection.voiceConnection.joinConfig.channelId) {
            return message.channel.send(
                '<:redx:1001554260862963733>' + ` You must be in the same voice channel as me to use this command.`
            );
        }

        // Get the currently playing track
        const track = queue.current;
        let dur = track.duration.split(":");
        
        // Get the remaining part of the user's message
        let rest_of_the_string = message.content.slice('!seek'.length)

        // Create an embed for invalid argument
        const invalidArgument = new MessageEmbed()
            .setColor('RED')
            .setDescription('<:redx:1001554260862963733>' + ' **Invalid Usage**\nThe ``duration`` argument is required.\n\nSupported durations: **ms=milliseconds, s=seconds, m=minutes, h=hours, d=days, w=weeks, M=months, y=years**\n\nUsage: ``!seek <duration>``')
        
        // Create an embed for invalid duration
        const invalidDuration = new MessageEmbed()
            .setColor('RED')
            .setDescription('<:redx:1001554260862963733>' + ' **Invalid ``duration`` Usage**\nInvalid ``duration`` specified.\n\nSupported durations: **ms=milliseconds, s=seconds, m=minutes, h=hours, d=days, w=weeks, M=months, y=years**\n\nUsage: ``!seek <duration>``')

        // Check if the user provided a duration
        if (!rest_of_the_string) {
            return message.channel.send({ embeds: [invalidArgument] })
        }

        // Check if the provided duration is less than 1
        if (rest_of_the_string < 1) {
            return message.channel.send({ embeds: [invalidDuration] })
        }

        // Convert the user-provided duration to milliseconds
        const timeToMS = ms(args.join(' '));

        // Check if the seek time is greater than or equal to the track's duration
        if (timeToMS >= queue.current.durationMS) {
            var newchar = ""
            if (dur[0] == 0 && dur[1] == 1) {
                return message.channel.send(`The video is only ${dur[1].split("0").join(newchar)} second long.`);
            } else if (dur[0] == 0 && dur[1] >= 2) {
                return message.channel.send(`The video is only ${dur[1].split("0").join(newchar)} seconds long.`);
            } else if (dur[0] == 1 && dur[1] == 0) {
                return message.channel.send(`The video is only ${dur[0].split("0").join(newchar)} minute long.`);
            } else if (dur[1] == 0) {
                return message.channel.send(`The video is only ${dur[0].split("0").join(newchar)} minutes long.`);
            } else {
                return message.channel.send(`The video is only ${dur[0].split("0").join(newchar)} minutes and ${dur[1].split("0").join(newchar)} seconds long.`);
            }
        }

        // Seek to the specified time in the track
        await queue.seek(timeToMS);

        // Send a confirmation message
        message.channel.send(`<:tick:1002623873575039016> Skipped to ${ms(timeToMS, { long: true })}.`);
    },
};
