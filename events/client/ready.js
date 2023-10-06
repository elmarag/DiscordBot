const boostCounter = require("../../counters/boost-counter");
const memberCounter = require("../../counters/member-counter");

module.exports = {
    run(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity(`t1meless Test Bot | !help`, { type: 'PLAYING' });
        memberCounter(client);
        boostCounter(client);
    }
}