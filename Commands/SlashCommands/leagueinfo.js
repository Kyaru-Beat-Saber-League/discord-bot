const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const client = require('../../index.js');
const { Leagueinfo } = require('../../Interface/League')
module.exports = {
    name: 'leagueinfo',
    description: '리그정보',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options:[
        {
            name:'seq',
            description:'번호',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const seq = interaction.options.get('seq')
        const list = await Leagueinfo(seq.value)
        await interaction.reply({content:`\`\`\`${JSON.stringify(list?.data)}\`\`\``})
    }
}