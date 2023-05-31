const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const client = require('../../index.js');
const axios = require('axios')
const dbClient = require('../../Database/database.js')

module.exports = {
    name: 'rankpost',
    description: '랭크곡 등록',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [
    {
        name: 'songseqid',
        description: '노래 아이디',
        type: ApplicationCommandOptionType.String,
        required: true,
    },],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id != '380629788940959746') return false;
        const songseqid = interaction.options.get('userid')?.value
        const stuser = await dbClient.query(`select * from kbslusers where user_id = '${interaction.user.id}'`)
        if(stuser.rowCount == 0) return await interaction.reply({content:'먼저 계정을 연동해주세요.', ephemeral: true})
        const param = {
            "songSeq" : songseqid,
            "steamId" : stuser.rows[0].steam_id,
        }
        const res = await axios({
            method: 'post',
            url: `${client.config.api}/rank`,
            params: param
        })
        switch(res.data.status){
            case 201:
                await interaction.reply({content:'등록이 완료되었습니다.'})
                break
            default:
                await interaction.reply({content:`등록에 실패했습니다. \`\`\`에러코드: ${res.data.status}\`\`\``})
                break
        }
    }
}