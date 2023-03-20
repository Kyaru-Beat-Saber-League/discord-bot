const {Message} = require('discord.js');
const client = require('../../index.js');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['pong', '핑', '퐁', '핑퐁'],
    /**
     * 
     * @param {client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let pingpong = message.content.toLocaleLowerCase().replaceAll(client.config.prefix, '').split(' ')[0];
        let pong = '';
        switch(pingpong){
            case 'ping':
                pingpong = 'ping';
                pong = 'pong';
                break
            case 'pong':
                pingpong = 'pong';
                pong = 'ping'
                break
            case '핑':
                pingpong = '핑'
                pong = '퐁'
                break
            case '퐁':
                pingpong = '퐁'
                pong = '핑'
                break
            case '핑퐁':
                pingpong = '핑퐁'
                pong = '퐁핑'
                break
        }
        const msg = await message.channel.send(`${pingpong}...`);
        await msg.edit(`${pong}! ${client.ws.ping}ms`);
    }
}