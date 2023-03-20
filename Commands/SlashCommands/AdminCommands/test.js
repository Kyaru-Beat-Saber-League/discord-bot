const { CommandInteraction, ApplicationCommandType, PermissionFlagsBits, ChannelType } = require('discord.js');
const client = require('../../../index.js');
const { newleagealert } = require('../../../Interface/schedule')

module.exports = {
    name: 'test',
    description: 'test',
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
            client.guilds.cache.forEach(guild => {

                const ch = guild.channels.cache.find(channel => channel.name == "리그-알림")
                if (ch) {
                    ch.send({ content: `test` })
                }
            })
        }
    }
}