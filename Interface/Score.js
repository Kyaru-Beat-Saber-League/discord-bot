const axios = require('axios')

const Endpoint_API = client.config.api

async function Scores(msg) {
    if (!msg) msg = 1
    const getlist = await axios.get(`${Endpoint_API}/league/`).catch((err) => {
        return err.response
    })
    return getlist.data
}

module.exports = { Scores }