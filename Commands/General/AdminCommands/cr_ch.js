const { Message } = require('discord.js');
const client = require('../../../index.js');

module.exports = {
    name: 'cr_ch',
    description: 'crch',
    aliases: [],
    /**
     * 
     * @param {client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(message.author.id != '380629788940959746') return;
        const guild = message.guild;
        const chd = guild.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name == "KBSL bot only")
        const chd1 = guild.channels.cache.find(channel => channel.name == "리그-공지")
        const chd2 = guild.channels.cache.find(channel => channel.name == "리그-알림")
        if (chd || chd1 || chd2) return interaction.reply({ content: `채널 및 카테고리가 이미 존재합니다.` })
        const category = await guild.channels.create({
            name: 'KBSL bot only', type: ChannelType.GuildCategory, permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [PermissionFlagsBits.SendMessages]
                },
                {
                    id: '380629788940959746',
                    allow: [PermissionFlagsBits.SendMessages]
                }]
        });
        const ch1 = await guild.channels.create({
            name: '리그-공지',
            type: ChannelType.GuildText,
            parent: category
        });
        const ch2 = await guild.channels.create({
            name: '리그-알림',
            type: ChannelType.GuildText,
            parent: category
        });
        await message.delete();
        await message.reply({ content: `${category.name} 카테고리와 ${ch1.name}, ${ch2.name} 채널이 생성되었습니다.` })
    }
}