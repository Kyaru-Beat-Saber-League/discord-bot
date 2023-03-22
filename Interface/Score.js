const axios = require('axios')

const Endpoint_API = 'https://api.kbsl.dev:443'

async function Scores(msg){
    if(!msg) msg = 1
    const getlist = await axios.get(`${Endpoint_API}/league/`).catch((err) => {
        return err.response
    })
    return getlist
}