const { CommandInteraction, ApplicationCommandType, PermissionFlagsBits, ChannelType } = require('discord.js');
const client = require('../../../index.js');
const { newleagealert } = require('../../../Interface/schedule')

module.exports = {
    name: 'newleaguealert',
    description: 'newleaguealert command',
    type: ApplicationCommandType.ChatInput,
    permission: [PermissionFlagsBits.Administrator],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild) return false;
        if (interaction.user.id == '380629788940959746') {
            newleagealert()
        }
    }
}