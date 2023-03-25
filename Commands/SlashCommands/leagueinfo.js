const { CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Colors } = require('discord.js');
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
    run: async (client, interaction) => {
        const seq = interaction.options.get('seq')
        const list = await Leagueinfo(seq.value)
        const res = list?.data
        const data = res?.data
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
                    let page = 1
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
                    const back = new ButtonBuilder()
                    back.setLabel('이전')
                    back.setStyle(ButtonStyle.Primary)
                    back.setCustomId('back')
                    const next = new ButtonBuilder()
                    next.setLabel('다음')
                    next.setStyle(ButtonStyle.Primary)
                    next.setCustomId('next')
                    const cancel = new ButtonBuilder()
                    cancel.setLabel('취소')
                    cancel.setStyle(ButtonStyle.Danger)
                    cancel.setCustomId('cancel')
                    const end = new ButtonBuilder()
                    end.setLabel('마지막')
                    end.setStyle(ButtonStyle.Primary)
                    end.setCustomId('end')
                    const first = new ButtonBuilder()
                    first.setLabel('처음')
                    first.setStyle(ButtonStyle.Primary)
                    first.setCustomId('first')
                    slembed.setTitle(`곡 리스트 [${page}/${slpages.length}]`)
                    if (page < 1) slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                    slembed.setColor(Colors.Fuchsia)
                    if (page > 0) page -= 1
                    if (page < slpages.length) {
                        for (let i = 0; i < slpages[page].length; i++) {
                            const sls = slpages[page][i]
                            slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                            slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n\nMapper: ${sls.uploaderName}\nDifficulty: ${sls.songDifficulty}\nModeType: ${sls.songModeType}`)
                            slembed.setFields({ name: `링크`, value: `\n[BeatSaver](https://beatsaver.com/maps/${sls.songId})\n[Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})\n[Zip download](${sls.downloadUrl})\n**OneClick**\n<beatsaver://${sls.songId}>` })
                        }
                    }
                    else {
                        slembed.setDescription('해당 페이지에는 곡이 존재하지 않습니다.')
                    }
                    if (slpages[page].length == 0) slembed.setDescription('곡이 존재하지 않습니다.')
                    back.setDisabled(true)
                    first.setDisabled(true)
                    const slmenucom = new ActionRowBuilder().addComponents([cancel, first, back, next, end])
                    await i.update({ embeds: [slembed], components: [slmenucom] }).then(async (msg) => {
                        const filter = (button) => button.user.id === i.user.id
                        const collector = msg.createMessageComponentCollector(filter, { time: 60000 })
                        collector.on('collect', async (b) => {
                            if (b.customId === 'back') {
                                if (page > 0) page -= 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\nMapper: ${sls.uploaderName}\nDifficulty: ${sls.songDifficulty}\nModeType: ${sls.songModeType}`)
                                        slembed.setFields({ name: `링크`, value: `[BeatSaver](https://beatsaver.com/maps/${sls.songId})\n[Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})\n[Zip download](${sls.downloadUrl})\n**OneClick**\n<beatsaver://${sls.songId}>` })
                                    }
                                }
                                else {
                                    slembed.setDescription('해당 페이지에는 곡이 존재하지 않습니다.')
                                }
                                if (slpages[page].length == 0) slembed.setDescription('곡이 존재하지 않습니다.')
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                if (page < slpages.length) {
                                    next.setDisabled(false)
                                    end.setDisabled(false)
                                }
                                if (page == 0) {
                                    back.setDisabled(true)
                                    first.setDisabled(true)
                                }
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            }
                            else if (b.customId === 'next') {
                                if (page < slpages.length) page += 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\nMapper: ${sls.uploaderName}\nDifficulty: ${sls.songDifficulty}\nModeType: ${sls.songModeType}`)
                                        slembed.setFields({ name: `링크`, value: `[BeatSaver](https://beatsaver.com/maps/${sls.songId})\n[Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})\n[Zip download](${sls.downloadUrl})\n**OneClick**\n<beatsaver://${sls.songId}>` })
                                    }
                                    slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                    if (page + 1 >= slpages.length) {
                                        next.setDisabled(true)
                                        end.setDisabled(true)
                                        back.setDisabled(false)
                                        first.setDisabled(false)
                                        b.update({ embeds: [slembed], components: [slmenucom] })
                                        return;
                                    }
                                    back.setDisabled(false)
                                    first.setDisabled(false)
                                    b.update({ embeds: [slembed], components: [slmenucom] })
                                }
                            } else if (b.customId === 'cancel') {
                                await b.update({ embeds: [slembed], components: [] })
                                collector.stop()
                            } else if (b.customId === 'end') {
                                page = slpages.length - 1
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n\nMapper: ${sls.uploaderName}\nDifficulty: ${sls.songDifficulty}\nModeType: ${sls.songModeType}`)
                                        slembed.setFields({ name: `링크`, value: `\n[BeatSaver](https://beatsaver.com/maps/${sls.songId})\n[Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})\n[Zip download](${sls.downloadUrl})\n**OneClick**\n<beatsaver://${sls.songId}>` })
                                    }
                                }
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                back.setDisabled(false)
                                first.setDisabled(false)
                                next.setDisabled(true)
                                end.setDisabled(true)
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            } else if (b.customId === 'first') {
                                page = 0
                                if (page < slpages.length) {
                                    for (let i = 0; i < slpages[page].length; i++) {
                                        const sls = slpages[page][i]
                                        slembed.setThumbnail(sls.coverUrl) // 곡 이미지
                                        slembed.setDescription(`[**${sls.songName} [ ${sls.songId} ]**](https://beatsaver.com/maps/${sls.songId}) #${sls.seq}\n\nMapper: ${sls.uploaderName}\nDifficulty: ${sls.songDifficulty}\nModeType: ${sls.songModeType}`)
                                        slembed.setFields({ name: `링크`, value: `\n[BeatSaver](https://beatsaver.com/maps/${sls.songId})\n[Preview](https://skystudioapps.com/bs-viewer/?id=${sls.songId})\n[Zip download](${sls.downloadUrl})\n**OneClick**\n<beatsaver://${sls.songId}>` })
                                    }
                                }
                                slembed.setTitle(`곡 리스트 [${page + 1}/${slpages.length}]`)
                                back.setDisabled(true)
                                first.setDisabled(true)
                                next.setDisabled(false)
                                end.setDisabled(false)
                                await b.update({ embeds: [slembed], components: [slmenucom] })
                            }
                        })
                    })
                }
            })
        })
    }
}