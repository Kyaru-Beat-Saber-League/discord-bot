const { Client, Collection, Partials, IntentsBitField } = require('discord.js');
const fs = require('fs');
const extra = require('fs-extra');
require('dotenv').config()

const client = new Client({
    intents: [99999, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.DirectMessages], partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User, Partials.GuildScheduledEvent, Partials.ThreadMember]
})
module.exports = client;

client.commands = new Collection();
client.slashcommands = new Collection();
client.config = require('./config');

// if leagueconfig.js is not exist, create it.
if (!fs.existsSync('./Config/leagueconfig.js')) {
    extra.copySync('./Config/leagueconfig-sample.js', './config/leagueconfig.js')
}

require('./handler')(client);
client.login(process.env.TOKEN);