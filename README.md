# KBSL Discord bot ver. 1.0

## What is this?
1. [KBSL](https://www.kbsl.dev/)'s Private Discord bot
## How to use source code?
````bash
$ git clone https://github.com/Kyaru-Beat-Saber-League/discord-bot.git
$ cd discord-bot
$ npm install
````
## How to run?
````bash
$ node index.js
````
## .env Config (Required for running, Create .env file in the directory)
````.env
TOKEN="Your Discord Bot Token" // Discord Bot Token
DB_HOST="Db Host" // Db Host
DB_USER="Db User" // Db User
DB_PORT="Db Port" // Db Port
DB_PASSWORD="Db Password" // Db Password
DB_DATABASE="Db Name" // Db Name
````
## config.js Config
````javascript
module.exports = {
    ownerID: "Your Discord ID", // Your Discord ID
    prefix: ";", // Prefix
    izuna: "Created By. Izuna_1", // Do not change this
}
````
