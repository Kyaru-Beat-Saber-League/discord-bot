const { EmbedBuilder } = require('discord.js')
async function SscErr(err) {
    const ErrorEmbed = new EmbedBuilder()
    ErrorEmbed.setTitle("에러!")
    ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`${err}\`\`\``)
    return ErrorEmbed
}

module.exports = { SscErr }