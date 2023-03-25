const client = require('../index.js');
const pg = require('pg')
require('dotenv').config()

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
};

const dbClient = new pg.Client(dbconfig);

dbClient.connect(async (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to PostgreSQL');
        const usrready = await dbClient.query(`select * from kbslusers order by id asc`)
        console.log(`유저 데이터 ${usrready.rowCount} 개 로드 완료`)
    }
})

dbClient.on("error", error => {
    return console.log(error);
})

module.exports = dbClient;