const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentBuilder, ActionRowBuilder, Colors, BaseSelectMenuBuilder } = require('discord.js');
const client = require('../../index.js');
const { Leagueinfo } = require('../../Interface/League')

let slpages = [];

module.exports = {
    name: 'leagueinfo',
    description: '리그정보',
    type: ApplicationCommandType.ChatInput,
    permission: [],
    options: [
        {
            name: 'seq',
            description: '번호',
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
        if (res.success == false) return interaction.reply({ content: `\`\`\`${res.message}\n에러코드: ${res.status}\`\`\`` })
        let lstatus = ''
        switch (data.leagueStatus) {
            case '진행중':
                lstatus = '🟢'
                break;
            case '대기중':
                lstatus = '🟡'
                break;
            case '종료':
                lstatus = '🔴'
                break;
            default:
                lstatus = '❔'
                break;
        }
        const embed = new EmbedBuilder()
        embed.setTitle(`${data.leagueName} [ #${data.seq} ]`)
        embed.setDescription(`만든사람: ${data.userName}\n\n\`\`\`${data.description}\`\`\`\n`)
        embed.addFields({ name: '기간', value: `시작: **${data.leagueStartDtime}**\n끝: **${data.leagueEndDtime}**` })
        embed.addFields({ name: '상태', value: `${lstatus}` })
        embed.addFields({ name: '링크', value: `[이동하기](https://kbsl.dev/league/detail?${data.seq})` })
        embed.setThumbnail(data.imageUrl)
        const songb = new ButtonBuilder()
        songb.setLabel('곡목록')
        songb.setStyle(ButtonStyle.Primary)
        songb.setCustomId('songlist')
        if (!data.songsList[0]) songb.setDisabled(true)
        const comp = new ActionRowBuilder().addComponents([songb])
        await interaction.reply({ embeds: [embed], components: [comp] }).then(async (msg) => {
            const filter = (i) => i.customId == 'songlist' && i.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({ filter, time: 1000 * 60 * 30 })
            collector.on('collect', async (i) => {
                if (i.customId == 'songlist') {
                    const songdata = data.songsList
                    let page = 0
                    slpages = []
                    try {
                        if (songdata.length > 1) {
                            for (let i = 0; i < songdata.length; i++) {
                                if (i % 1 == 0) {
                                    slpages.push([])
                                }
                                slpages[slpages.length - 1].push(songdata[i])
                            }
                        } else {
                            slpages.push(songdata)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    const slembed = new EmbedBuilder()
                    // slpages button
                    const slb = new ButtonBuilder()
                    slb.setLabel('이전')
                    slb.setStyle(ButtonStyle.Primary)
                    slb.setCustomId('slb')
                    const slb2 = new ButtonBuilder()
                    slb2.setLabel('다음')
                    slb2.setStyle(ButtonStyle.Primary)
                    slb2.setCustomId('slb2')
                    const slb3 = new ButtonBuilder()
                    slb3.setLabel('취소')
                    slb3.setStyle(ButtonStyle.Danger)
                    slb3.setCustomId('slb3')
                    const slb4 = new ButtonBuilder()
                    slb4.setLabel('마지막')
                    slb4.setStyle(ButtonStyle.Primary)
                    slb4.setCustomId('slb4')
                    const slb5 = new ButtonBuilder()
                    slb5.setLabel('처음')
                    slb5.setStyle(ButtonStyle.Primary)
                    slb5.setCustomId('slb5')
                    slembed.setTitle(`곡 리스트 [${page}/${slpages.length}]`)
                    if (page < 1) slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                    slembed.setColor(Colors.Fuchsia)
                    if (page > 0) page -= 1
                    if (page < slpages.length) {
                        for (let i = 0; i < slpages[page].length; i++) {
                            const sls = slpages[page][i]
                            slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                            slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n
                            Mapper: ${sls.uploaderName}
                            Difficulty: ${sls.songDifficulty}
                            ModeType: ${sls.songModeType}`)
                            slembed.setFields({
                                name: `링크`, value: `
                            [BeatSaver](https://beatsaver.com/maps/${sls.songId})
                            [Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})
                            [Zip download](${sls.downloadUrl})
                            **OneClick**
                            <beatsaver://${sls.songId}>`
                            })

                        }
                    }
                    else {
                        slembed.setDescription('해당 페이지에는 곡이 존재하지 않습니다.')
                    }
                    if (slpages[page].length == 0) slembed.setDescription('곡이 존재하지 않습니다.')

                    const slmenucom = new ActionRowBuilder().addComponents([slb3, slb5, slb, slb2, slb4])
                    await i.update({ embeds: [slembed], components: [slmenucom] }).then(async (msg) => {
                        const filter = (button) => button.user.id === i.user.id
                        const collector = msg.createMessageComponentCollector(filter, { time: 60000 })
                        collector.on('collect', async (b) => {
                            if (b.customId === 'slb') {
                                if (page > 0) page -= 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n
                                        Mapper: ${sls.uploaderName}
                                        Difficulty: ${sls.songDifficulty}
                                        ModeType: ${sls.songModeType}`)
                                        slembed.setFields({
                                            name: `링크`, value: `
                                        [BeatSaver](https://beatsaver.com/maps/${sls.songId})
                                        [Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})
                                        [Zip download](${sls.downloadUrl})
                                        **OneClick**
                                        <beatsaver://${sls.songId}>`
                                        })

                                    }
                                }
                                else {
                                    slembed.setDescription('해당 페이지에는 곡이 존재하지 않습니다.')
                                }
                                if (slpages[page].length == 0) slembed.setDescription('곡이 존재하지 않습니다.')
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            }
                            else if (b.customId === 'slb2') {
                                if (page < slpages.length) page += 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n
                                        Mapper: ${sls.uploaderName}
                                        Difficulty: ${sls.songDifficulty}
                                        ModeType: ${sls.songModeType}`)
                                        slembed.setFields({
                                            name: `링크`, value: `
                                        [BeatSaver](https://beatsaver.com/maps/${sls.songId})
                                        [Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})
                                        [Zip download](${sls.downloadUrl})
                                        **OneClick**
                                        <beatsaver://${sls.songId}>`
                                        })
                                    }
                                    slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                    b.update({ embeds: [slembed], components: [slmenucom] })
                                }
                            } else if (b.customId === 'slb3') {
                                await b.update({ embeds: [slembed], components: [] })
                                collector.stop()
                            } else if (b.customId === 'slb4') {
                                page = slpages.length - 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n
                                        Mapper: ${sls.uploaderName}
                                        Difficulty: ${sls.songDifficulty}
                                        ModeType: ${sls.songModeType}`)
                                        slembed.setFields({
                                            name: `링크`, value: `
                                        [BeatSaver](https://beatsaver.com/maps/${sls.songId})
                                        [Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})
                                        [Zip download](${sls.downloadUrl})
                                        **OneClick**
                                        <beatsaver://${sls.songId}>`})
                                    }
                                }
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            } else if (b.customId === 'slb5') {
                                page = 0
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n
                                        Mapper: ${sls.uploaderName}
                                        Difficulty: ${sls.songDifficulty}
                                        ModeType: ${sls.songModeType}`)
                                        slembed.setFields({
                                            name: `링크`, value: `
                                        [BeatSaver](https://beatsaver.com/maps/${sls.songId})
                                        [Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})
                                        [Zip download](${sls.downloadUrl})
                                        **OneClick**
                                        <beatsaver://${sls.songId}>`})
                                    }
                                }
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            }
                        })
                    })
                }
            })
        })
    }
}