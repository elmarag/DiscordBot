const fs = require('fs');

module.exports = (client, Discord) => {

    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    const music_command_files = fs.readdirSync('./commands/music/').filter(file => file.endsWith('.js'));

    for (const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        }else{
            continue;
        }
    }

    for (const file of music_command_files){
        const command = require(`../commands/music/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        }else{
            continue;
        }
    }
}