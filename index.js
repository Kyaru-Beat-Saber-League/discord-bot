const { Client, Collection, Partials, IntentsBitField } = require('discord.js');
require('dotenv').config()

const client = new Client({
    intents: [99999, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.DirectMessages], partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User, Partials.GuildScheduledEvent, Partials.ThreadMember]
})
module.exports = client;

client.commands = new Collection();
client.slashcommands = new Collection();
client.config = require('./config');

require('./handler')(client);
client.login(process.env.TOKEN);