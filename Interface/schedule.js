const Discord = require('discord.js')
const client = require('../index')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { Leaguetimer } = require('../Interface/League')

const channelname = '리그-알림'

async function newleagealert() {
    try {
        const configpath = path.join(__dirname, '../Config/leagueconfig.js')
        let config = require(configpath)
        const data = await Leaguetimer()
        const lastNotice = data.content[0];
        if (lastNotice.seq !== config.newlgseq) {
            client.guilds.cache.forEach(guild => {
                const ch = guild.channels.cache.find(channel => channel.name == channelname)
                if (ch) {
                    const embed = new Discord.EmbedBuilder()
                    embed.setTitle(`새로운 리그가 등록되었습니다!`)
                    embed.addFields({ name: `${lastNotice.leagueName} [ #${lastNotice.seq} ]`, value: `${lastNotice.description}\n\n만든사람: ${lastNotice.userName}\n**시작: ${lastNotice.leagueStartDtime}\n끝: ${lastNotice.leagueEndDtime}**\n[이동하기](https://kbsl.dev/league/detail?${lastNotice.seq})` })
                    ch.send({ embeds: [embed] })
                }
            })
            config.newlgseq = lastNotice.seq;
            fs.writeFile(configpath, `module.exports = ${JSON.stringify(config, null, 4)}`, (err) => {
                if (err) return;
            });
        }
    } catch (err) {
        console.log(err)
    }
}

async function startleaguealert() {
    try{
        const data = await Leaguetimer()
        const lastNotice = data.content[0];
        client.guilds.cache.forEach(guild => {
            const ch = guild.channels.cache.find(channel => channel.name == channelname)
            if (ch) {
                const embed = new Discord.EmbedBuilder()
                embed.setTitle(`리그가 시작되었습니다!`)
                embed.addFields({ name: `${lastNotice.leagueName} [ #${lastNotice.seq} ]`, value: `${lastNotice.description}\n\n만든사람: ${lastNotice.userName}\n**시작: ${lastNotice.leagueStartDtime}\n끝: ${lastNotice.leagueEndDtime}**\n[이동하기](https://kbsl.dev/league/detail?${lastNotice.seq})` })
                ch.send({ embeds: [embed] })
            }
        })
    }catch(err){
        return console.log(err)
    }
}

async function endleaguealert() {
    try{
        const data = await Leaguetimer()
        const lastNotice = data.content[0];
        client.guilds.cache.forEach(guild => {
            const ch = guild.channels.cache.find(channel => channel.name == channelname)
            if (ch) {
                const embed = new Discord.EmbedBuilder()
                embed.setTitle(`리그가 종료되었습니다!`)
                embed.addFields({ name: `${lastNotice.leagueName} [ #${lastNotice.seq} ]`, value: `${lastNotice.description}\n\n만든사람: ${lastNotice.userName}\n**시작: ${lastNotice.leagueStartDtime}\n끝: ${lastNotice.leagueEndDtime}**\n[이동하기](https://kbsl.dev/league/detail?${lastNotice.seq})` })
                ch.send({ embeds: [embed] })
            }
        })
    }catch(err){
        return console.log(err)
    }
}

module.exports = { newleagealert, startleaguealert, endleaguealert }