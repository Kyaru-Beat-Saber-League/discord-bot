const { CommandInteraction, ApplicationCommandType, PermissionFlagsBits, ChannelType } = require('discord.js');
const client = require('../../../index.js');

module.exports = {
    name: 'cr_ch',
    description: 'Creating Bot Only Category and channals',
    type: ApplicationCommandType.ChatInput,
    permission: [PermissionFlagsBits.Administrator],
    /**
     * @param {client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild) return false;
        if (interaction.user.id == '380629788940959746') {
            const guild = interaction.guild;
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
            await interaction.reply({ content: `${category.name} 카테고리와 ${ch1.name}, ${ch2.name} 채널이 생성되었습니다.` })
        }
    }
}