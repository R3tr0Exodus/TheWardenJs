const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('choose a member to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reasons')
            .setDescription('Give a reason')
            .setRequired(false)),
            
    async execute(interaction) {
        const memberToBan = interaction.options.getUser('member');
        const banMember = await interaction.guild.members.fetch(memberToBan.id);
        let reason = interaction.options.getString('reasons')
        const instigator = interaction.member.id;
        if (!reason)
            reason = 'No reason specified';
        if (!memberToBan) 
            interaction.reply({content: 'You must specify which member to ban', ephemeral: true});
        if (memberToBan == '1290757963182641296')
            return await interaction.reply('Are you trying to ban the bot you doofus?')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))
            return await interaction.reply({content: 'You do not have the permission for this command', ephemeral: true})
        if (interaction.banMember == instigator)
            return await interaction.reply({content:`you can't ban yourself dumb dumb`, ephemeral: true})

        const banSuccess = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`:white_check_mark: ${memberToBan.tag} has been successfully banned | Reason: ${reason} | Instigator: ${instigator}`)

        const successfulBanPost = new EmbedBuilder()
        .setColor("Green")
        .setTitle('Ban')
        .setDescription('A member has been banned from the server')
        .addFields(
            {name: 'Banned:', value: `${memberToBan.tag}`, inline: true},
            {name: 'Reason:', value: `${reason}`, inline: true},
            {name: 'Instigator:', value: `${interaction.member.tag}`, inline: true},
            {name: 'time', value: `<t:${Math.floor(Date.now() / 1000) + 3600}:D>`})

        await interaction.guild.bans.create(banMember, {reason}).catch(err => {
            return interaction.reply({content: 'cannot ban this user', ephemeral: true})
        });

        await interaction.reply({embeds: [banSuccess]})
    }
}