const client = require('../index.js')
const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'Chat Events'
}

client.on(Discord.Events.MessageCreate, async (message) => {
})