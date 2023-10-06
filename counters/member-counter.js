module.exports =  async (client) => {
    const guild = client.guilds.cache.get('1001544363853221899');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('1001551916712607787');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count...')
    }, 600000);    
}