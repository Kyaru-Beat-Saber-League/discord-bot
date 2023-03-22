const Discord = require('discord.js');
const client = require('../index.js');

module.exports = {
    name: 'SlashCommand_Enable',
};

client.on(Discord.Events.InteractionCreate, async (interaction) => {
    if (interaction.user.bot) return;
    if (interaction.channel.type === Discord.ChannelType.DM) return;
    const ErrorEmbed = new Discord.EmbedBuilder()
    ErrorEmbed.setTitle("에러!")
    
    if (interaction.isCommand()) {
        const cmd = client.slashcommands.get(interaction.commandName);
        ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`명령어가 존재하지 않습니다.\`\`\``)
        if (!cmd) return await interaction.reply({ embeds:[ErrorEmbed], ephemeral: true });
        const args = [];
        if (cmd.permission) {
            const authorperms = interaction.channel.permissionsFor(interaction.member);
            if (!authorperms || !authorperms.has(cmd.permission)) {
                ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`권한이 부족합니다.\`\`\``)
                await interaction.reply({ embeds:[ErrorEmbed], ephemeral: true });
                console.log(`${cmd.name} | ${interaction.member.user.tag} | ${interaction.member.id} | ${interaction.guild.name} | ${interaction.guild.id} | 권한 부족`);
                return false;
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
            ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`${err}\`\`\``)
            await interaction.reply({ embeds:[ErrorEmbed], ephemeral: true });
            console.log(err);
            return false;
        }
    }
    if (interaction.isContextMenuCommand()) {
        const cmd = client.slashcommands.get(interaction.commandName);
        ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`명령어가 존재하지 않습니다.\`\`\``)
        if (!cmd) return await interaction.reply({ embeds:[ErrorEmbed], ephemeral: true });
        try {
            if (cmd) await cmd.run(client, interaction);
        } catch (err) {
            ErrorEmbed.setDescription("에러가 발생했습니다!\n" + `\`\`\`${err}\`\`\``)
            await interaction.reply({ embeds:[ErrorEmbed], ephemeral: true });
            console.log(err);
            return false;
        }
    }
})