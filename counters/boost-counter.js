module.exports = async (client) => {
    const guild = client.guilds.cache.get('1001544363853221899');


    setInterval(async () => {
        const boostCount = guild.premiumSubscriptionCount;
        const channel = guild.channels.cache.get('1001552159252418580');
        channel.setName(`🚀 𝗦𝗲𝗿𝘃𝗲𝗿 𝗕𝗼𝗼𝘀𝘁𝘀: ${boostCount.toLocaleString()}`);
        console.log('Updating Boost Count');
        //console.log(guild.premiumSubscriptionCount);
    }, 600000);
}