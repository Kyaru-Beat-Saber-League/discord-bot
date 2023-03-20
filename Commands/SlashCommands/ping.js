const { CommandInteraction, ApplicationCommandType } = require('discord.js');
const client = require('../../index.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.reply(`ping...`);
        await interaction.editReply(`pong! ${client.ws.ping}ms`);
    }
}