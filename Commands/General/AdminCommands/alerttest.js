const { Message } = require('discord.js');
const client = require('../../../index.js');
const sch = require('../../../Interface/schedule.js');

module.exports = {
    name: 'artest',
    description: 'artest',
    aliases: [],
    /**
     * 
     * @param {client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(message.author.id != '380629788940959746') return;

    }
}