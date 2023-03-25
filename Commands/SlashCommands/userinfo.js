const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const client = require('../../index.js');
const { User, Link } = require('../../Interface/User.js')

module.exports = {
    name: 'userinfo',
    description: '유저 정보 검색',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [
        {
            name: 'userid',
            description: '고유번호 OR 비트리더 아이디',
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
        const userid = interaction.options.get('userid')?.value
        try {
            const urluid = userid.match(/\d+/)[0];
            let usr = await User(userid)
            if (userid.length >= 10) usr = await Link(urluid)
            if (usr.success == false) return interaction.reply({ content: `\`\`\`${usr.message}\n에러코드: ${usr.status}\`\`\`` })
            const embed = new EmbedBuilder()
            embed.setTitle(`유저 정보`)
            embed.setColor(Colors.Aqua)
            embed.setThumbnail(usr.data.imageUrl)
            embed.addFields({ name: '유저 이름', value: `${usr.data.userName}` })
            embed.addFields({ name: '아이디', value: `고유번호: **\`${usr.data.seq}\`**\n스팀 아이디: **\`${usr.data.steamId}\`**` })
            const role = usr.data.erole == 'ROLE_USER' ? '유저' : usr.data.erole
            embed.addFields({ name: '역할', value: `${role}` })
            await interaction.reply({ embeds: [embed] })
        } catch (err) {
            return interaction.reply({ content: `\`\`\`고유번호, 아이디, 혹은 링크가 아닙니다. 다시한번 확인해주세요!\`\`\``, ephemeral: true })
        }
    }
}