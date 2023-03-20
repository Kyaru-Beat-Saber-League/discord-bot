const axios = require('axios')
const client = require('../index.js')

const Endpoint_API = 'https://api.kbsl.dev:443'
const channelname= 'KBSL리그-알림'
let lastNoticeID = null;

async function newleagealert(){
    // try {
    //     const res = await axios.get(`${Endpoint_API}/league?page=0`)
    //     const data = res.data;
    //     const lastNotice = data[0];
    //     if(lastNotice.seq !== lastNoticeID){
    //         const channel = client.channels.cache.find(channel => channel.name == channelname)
    //         channel.send(`${lastNotice.leagueName}`);
    //         lastNoticeID = lastNotice.seq;
    //     }
    // }catch(err){
    //     console.log(err)
    // }
}
module.exports = { newleagealert }