const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick a member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('choose a member to kick')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reasons')
            .setDescription('Give a reason')
            .setRequired(false)),
            
    async execute(interaction) {
        const memberToKick = interaction.options.getUser('member');
        const kickMember = await interaction.guild.members.fetch(memberTokick.id);
        let reason = interaction.options.getString('reasons')
        const instigator = interaction.member.id;
        if (!reason)
            reason = 'No reason specified';
        if (!memberToKick) 
            interaction.reply({content: 'You must specify which member to kick', ephemeral: true});
        if (memberToKick == '1290757963182641296')
            return await interaction.reply('Are you trying to kick the bot you doofus?')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers))
            return await interaction.reply({content: 'You do not have the permission for this command', ephemeral: true})
        if (interaction.kickMember == instigator)
            return await interaction.reply({content:`you can't kick yourself dumb dumb`, ephemeral: true})

        const kickSuccess = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`:white_check_mark: ${memberTokick.tag} has been successfully kicked | Reason: ${reason} | Instigator: ${instigator}`)

        const successfulKickPost = new EmbedBuilder()
        .setColor("Green")
        .setTitle('kick')
        .setDescription('A member has been kicked from the server')
        .addFields(
            {name: 'kick:', value: `${memberToKick.tag}`, inline: true},
            {name: 'Reason:', value: `${reason}`, inline: true},
            {name: 'Instigator:', value: `${interaction.member.tag}`, inline: true},
            {name: 'time', value: `<t:${Math.floor(Date.now() / 1000) + 3600}:D>`})

        await interaction.guild.kicks.create(kickMember, {reason}).catch(err => {
            return interaction.reply({content: 'cannot kick this user', ephemeral: true})
        });

        await interaction.reply({embeds: [kickSuccess]})
    }
}