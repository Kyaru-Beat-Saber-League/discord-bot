const client = require('../index.js');
const Discord = require('discord.js');
module.exports = {
    name: 'ready'
}

client.on(Discord.Events.ClientReady, (client) => {
    console.log(`\nLogged in as ${client.user.tag} | ${client.user.id}!`);
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers Online`, type: Discord.ActivityType.Watching }]})
})