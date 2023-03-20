const Discord = require('discord.js')
const client = require('../index')
const axios = require('axios')

const Endpoint_API = 'https://api.kbsl.dev:443'

async function Leagueinfo(msg){
    if(!msg) msg = 1
    const getlist = await axios.get(`${Endpoint_API}/league/${msg}`).catch((err) => {
        return err.response
    })
    return getlist
}
async function Leaguelist(msg){
    if(!msg) msg = 0;
    const getlist = await axios.get(`${Endpoint_API}/league?page=${msg}`).catch((err) => {
        return err.response
    })
    return getlist.data.data
}

module.exports = { Leagueinfo, Leaguelist }