const { CommandInteraction, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');
const client = require('../../../index.js');

module.exports = {
    name: 'cr_ch',
    description: 'Creating Bot Only Category and channals',
    type: ApplicationCommandType.ChatInput,
    permission: [PermissionFlagsBits.Administrator],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
    }
}