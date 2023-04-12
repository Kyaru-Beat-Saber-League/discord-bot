const axios = require('axios')
const client = require('../index.js')
const Discord = require('discord.js')

const Endpoint_API = client.config.api

async function User(usr) {
    const getuser = await axios.get(`${Endpoint_API}/user/${usr}`).catch((err) => {
        return err.response
    })
    return getuser.data
}

async function Link(usr) {
    const getuser = await axios.get(`${Endpoint_API}/user/steam?steamId=${usr}`).catch((err) => {
        return err.response
    })
    return getuser.data
}

module.exports = { User, Link }