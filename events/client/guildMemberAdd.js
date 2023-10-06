const { MessageEmbed } = require('discord.js')
const moment = require('moment');
const { drawCard, LinearGradient, Text } = require('discord-welcome-card');

module.exports = {
    async run(client, member) {
        
        const memberCount = member.guild.memberCount;

        //--------------------------------------------------------------------------------------------------------
        const channel = client.channels.cache.get('1001544953895321640')
        const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Member Join')
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setDescription(`**${member.displayName}** joined the server.`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                {
                    name: `User ping`,
                    value: `<@${member.id}>`
                }
            )
            .addFields(
                {
                    name: `User ID`,
                    value: `${member.id}`
                }
            )
            .addFields(
                {
                    name: 'Joined server',
                    value: moment(member.joinedAt).format('LLLL')
                }
            )
            .addFields(
                {
                    name: 'Joined Discord',
                    value: moment(member.user.createdAt).format('LLLL')
                })
        channel.send({ embeds: [embed] })

        //---------------------------------------------------------------------------------------------

        //WELCOME CARD

        //Give welcome role to the new member
        let welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');
        member.roles.add(welcomeRole);


        //Get the welcome channel ID
        //const welcomechannel = client.channels.cache.get('975020551271747584');

        //Generating the actual custom Card
        const image = await drawCard({
            theme: 'circuit',
            text: {
                title: 'Welcome,',
                text: member.user.username,
                //FIX TO NOYMERO
                subtitle: new Text(`you are the ${memberCount}th \nof the server.`, 255, 200).setFontSize(18),
                color: `#ffffff`,
                font: '"Good Times Rg", 10px',
            },
            avatar: {
                image: member.user.displayAvatarURL({ format: 'png' }),
                outlineWidth: 5,
                outlineColor: new LinearGradient([0, '#b68f2b'], [1, '#f3da75']),
                imageRadius: 0.7,
            },
            card: {
                background: 'https://i.imgur.com/QtIILGP.jpg',
                blur: 0.4,
                border: false,
                rounded: true,
            }
        });

        try {
            await member.guild.channels.cache.get('1001545602196308128').send({
                content: `Welcome <@${member.id}> to the server!`,
                files: [image],
            })
        } catch (error) {
            console.log(error)
        }

        //--------------------------------------------------------------------------------------------------------

        //Raid Check
        const accAge = Math.abs(Date.now() - member.user.createdAt);
        const accDays = Math.ceil(accAge / (1000 * 60 * 60 * 24));
        if (accDays <= 2) {

            await client.users.fetch(member).then(() => {
                member.send('Kicked because the account is less than two days old.').catch(error => {
                    console.log('something went wrong while trying to send dm')
                })
            })
            await member.kick();
            // member.send('test').catch(error => {
            //     console.log('something went wrong while trying to send dm')
            // })
        }
    }
}