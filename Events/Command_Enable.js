const Discord = require('discord.js');
const client = require('../index.js');

module.exports = {
    name: 'Command_Enable',
};

client.on(Discord.Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;
    if (message.content.toLowerCase().startsWith(client.config.prefix)) {
        let [cmd, ...args] = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
        let command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases?.includes(cmd.toLowerCase()));
        if (command) {
            console.log(`${command.name} | ${message.member.user.tag} | ${message.member.id} | ${message.guild.name} | ${message.guild.id}`);
            try {
                await command.run(client, message, args)
            } catch (err) {
                console.log(err);
            }
        }
    }
})