const client = require('../index.js');
const Discord = require('discord.js');
const dbClient = require('../Database/database.js')
module.exports = {
    name: 'ready'
}

client.on(Discord.Events.ClientReady, async (client) => {
    console.log(`Logged in as ${client.user.tag} | ${client.user.id}!`);
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers Online`, type: Discord.ActivityType.Watching }] })
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers Online`, type: Discord.ActivityType.Watching }] })
    }, 300000); // 10분마다 상태메시지 변경
})