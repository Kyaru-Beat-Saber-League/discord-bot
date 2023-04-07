const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const client = require('../../index.js');

module.exports = {
    name: 'test',
    description: 'test!',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id != '380629788940959746') return false;
    }
}