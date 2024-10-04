const { SlashCommandBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('choose a member to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Give a reason')
            .setRequired(true)),
    async execute(interaction) {
        const memberToBan = interaction.options.getUser('member');
        const banMember = await interaction.guild.members.fetch(memberToBan.id);
        const reason = interaction.options.getString('reason')
        const instigator = interaction.user.id;

        if (!interaction.member.Permissions.has(PermissionsBitField.Flags.BanMembers))
            return await interaction.reply({content: 'You do not have the permission for this command', ephemeral: true})
        if (interaction.member.id === instigator)
            return await interaction.reply({content:`you can't ban yourself dumb dumb`, ephemeral: true})

        await interaction.guild.bans.create(banMember, {reason}).catch(err => {
            return interaction.reply({content: 'cannot ban this user', ephemeral: true})});

        await interaction.reply(`${memberToBan.tag} has been banned for ${reason} by ${instigator}`)
    }
}
console.log('member')