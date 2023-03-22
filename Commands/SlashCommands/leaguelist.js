const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const client = require('../../index.js');
const { Leaguelist } = require('../../Interface/League')

let pages = [];

module.exports = {
    name: 'leaguelist',
    description: '리그리스트',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [{
        name: 'page',
        description: '페이지',
        type: ApplicationCommandOptionType.Integer,
        required: false,
    }],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let page = interaction.options.get('page')?.value
        if (page == undefined) page = 0
        const list = await Leaguelist()
        pages = [];
        try {
            if (list.content.length > 5) {
                for (let i = 0; i < list.content.length; i++) {
                    if (i % 5 == 0) {
                        pages.push([])
                    }
                    pages[pages.length - 1].push(list.content[i])
                }
            } else {
                pages.push(list.content)
            }
            
            const embed = new EmbedBuilder()
            embed.setTitle(`리그 리스트 [${page}/${pages.length}]`)
            if (page < 1) embed.setTitle(`리그 리스트 [${page + 1}/${pages.length}]`)
            embed.setColor(0x00FF00)
            if (page > 0) page -= 1
            if (page < pages.length) {
                for (let i = 0; i < pages[page].length; i++) {
                    const pag = pages[page][i]
                    let lstatus = ''
                    switch (pag.leagueStatus) {
                        case '진행중':
                            lstatus = '🟢'
                            break;
                        case '대기중':
                            lstatus = '🟡'
                            break;
                        case '종료':
                            lstatus = '🔴'
                    }
                    embed.addFields({ name: `${lstatus} ${pag.leagueName} [ #${pag.seq} ]`, value: `${pag.description}\n\n만든사람: ${pag.userName}\n**시작: ${pag.leagueStartDtime}\n끝: ${pag.leagueEndDtime}**\n[이동하기](https://kbsl.dev/league/detail?${pag.seq})` })
                }
            }
            else {
                embed.setDescription('해당 페이지에는 리그가 존재하지 않습니다.')
            }
            if(pages[page].length == 0) embed.setDescription('리그 목록이 존재하지 않습니다.')
            await interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    }
}