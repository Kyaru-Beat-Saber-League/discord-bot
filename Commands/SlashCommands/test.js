const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const client = require('../../index.js');
const { User } = require('../../Interface/User.js')

module.exports = {
    name: 'test',
    description: 'test!',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [
    {
        name: 'userid',
        description: '비트리더 아이디',
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
        if (interaction.user.id != '380629788940959746') return false;
        const userid = interaction.options.get('userid')?.value
        const usr = await User(userid)
        const embed = new EmbedBuilder()
        embed.setTitle(`유저 정보`)
        embed.setColor(Colors.Aqua)
        embed.setThumbnail(usr.imageUrl)
        embed.addFields({name:'유저 이름', value:usr.userName})
        embed.addFields({name:'아이디', value:`고유번호: **\`${usr.seq}\`**\n스팀 아이디: **\`${usr.steamId}\`**`})
        embed.addFields({name: '역할', value:`${usr.erole}`})
        await interaction.reply({embeds:[embed]})
        console.log(usr)
    }
}