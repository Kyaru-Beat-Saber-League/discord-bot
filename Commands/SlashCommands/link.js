const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const client = require('../../index.js');
const { Link } = require('../../Interface/User.js')
const dbClient = require('../../Database/database.js')

module.exports = {
    name: 'link',
    description: 'KBSL 홈페이지와 연동합니다.',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [
        {
            name: 'userid',
            description: '비트리더 | 스코어세이버 | 스팀 아이디 혹은 링크',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try{
            const userid = interaction.options.get('userid')?.value
            const urluid = userid.match(/\d+/)[0];
            const usr = await Link(urluid)
            if (usr.success == false) return interaction.reply({ content: `\`\`\`${usr.message}\n에러코드: ${usr.status}\`\`\`` })
            const dbusr = await dbClient.query(`select * from kbslusers where steam_id = '${urluid}'`)
            if(dbusr.rowCount > 0) return interaction.reply({ content: `\`\`\`해당 아이디는 이미 등록되어있는 아이디 입니다.\`\`\`` })
            await dbClient.query(`insert into kbslusers (user_name, user_id, steam_id, kbsl_seq) values ('${interaction.user.tag}', '${interaction.user.id}', '${urluid}', '${usr.seq}')`)
            const embed = new EmbedBuilder()
            embed.setTitle(`등록`)
            embed.setColor(Colors.Aqua)
            embed.setThumbnail(interaction.user.avatarURL())
            embed.addFields({name:'유저 이름', value:interaction.user.tag})
            embed.addFields({name:'아이디', value:`고유번호: **\`${usr.seq}\`**\n스팀 아이디: **\`${urluid}\`**`})
            embed.addFields({name: '역할', value:`${usr.erole}`})
            await interaction.reply({ embeds: [embed] })
        }catch(err){
            return interaction.reply({ content: `\`\`\`아이디, 혹은 링크가 아닙니다. 다시한번 확인해주세요!\`\`\``,ephemeral:true })
        }
    }
}