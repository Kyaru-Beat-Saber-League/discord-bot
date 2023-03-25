const axios = require('axios')
const client = require('../index.js')
const Discord = require('discord.js')

const Endpoint_API = 'https://api.kbsl.dev:443'

async function User(usr){
    const getuser = await axios.get(`${Endpoint_API}/user/${usr}`).catch((err) => {
        return err.response
    })
    return getuser.data.data
}

module.exports = { User }