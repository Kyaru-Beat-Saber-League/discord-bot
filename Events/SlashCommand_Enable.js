const Discord = require('discord.js');
const client = require('../index.js');
const { SscErr } = require('../Interface/Embed.js')

module.exports = {
    name: 'SlashCommand_Enable',
};

client.on(Discord.Events.InteractionCreate, async (interaction) => {
    if (interaction.user.bot) return;
    if (interaction.channel.type === Discord.ChannelType.DM) return;
    if (interaction.isCommand()) {
        const cmd = client.slashcommands.get(interaction.commandName);
        if (!cmd) return await interaction.reply({ embeds:[SscErr(`명령어가 존재하지 않습니다.`)], ephemeral: true });
        const args = [];
        if (cmd.permission) {
            const authorperms = interaction.channel.permissionsFor(interaction.member);
            if (!authorperms || !authorperms.has(cmd.permission)) {
                return await interaction.reply({ embeds:[SscErr(`권한이 부족합니다.`)], ephemeral: true });
            }
        }
        for (let option of interaction.options.data) {
            if (option.type == Discord.ApplicationCommandOptionType.Subcommand) {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value)
        }
        console.log(`${cmd.name} | ${interaction.member.user.tag} | ${interaction.member.id} | ${interaction.guild.name} | ${interaction.guild.id}`);
        try {
            await cmd.run(client, interaction, args);
        } catch (err) {
            await interaction.reply({ embeds:[SscErr(err)], ephemeral: true });
            console.log(err);
            return;
        }
    }
    if (interaction.isContextMenuCommand()) {
        const cmd = client.slashcommands.get(interaction.commandName);
        if (!cmd) return await interaction.reply({ embeds:[errorEmbed], ephemeral: true });
        try {
            if (cmd) await cmd.run(client, interaction);
        } catch (err) {
            await interaction.reply({ embeds:[SscErr(err)], ephemeral: true });
            console.log(err);
            return;
        }
    }
})