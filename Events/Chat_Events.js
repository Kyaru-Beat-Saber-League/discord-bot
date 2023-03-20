const client = require('../index.js')
const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'Chat Events'
}

client.on(Discord.Events.MessageCreate, async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === 'DM') return;
    if(message.content.startsWith(client.config.prefix)) return;
})