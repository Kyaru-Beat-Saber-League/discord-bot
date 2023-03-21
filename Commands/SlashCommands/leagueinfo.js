const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
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
        const res = list?.data
        const data = res?.data
        console.log(res)
        if(res.success == false) return interaction.reply({content:`\`\`\`${res.message}\n에러코드: ${res.status}\`\`\``})
        const embed = new EmbedBuilder()
        embed.setTitle(`${data.leagueName} [ #${data.seq} ]`)
        await interaction.reply({content:`\`\`\`${JSON.stringify(res.data)}\`\`\``,embeds:[embed]})
    }
}