const Discord = require('discord.js')
const client = require('../index')
const axios = require('axios')

async function Leaguelist(msg){
    const getlist = await axios.get(`https://api.kbsl.dev:443/league/${msg}`).catch((err) => {
        return err.response
    })
    return getlist
}

module.exports = { Leaguelist }