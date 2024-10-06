const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('choose a member to unban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reasons')
            .setDescription('Give a reason')
            .setRequired(false)),
            
    async execute(interaction) {
        const memberToUnbanID = interaction.options.getUser('member');
        let reason = interaction.options.getString('reasons')
        const instigator = interaction.member;
        if (!reason)
            reason = 'No reason specified';
        if (!memberToUnbanID) 
            interaction.reply({content: 'You must specify an ID to unban', ephemeral: true});
        if (memberToUnbanID == '1290757963182641296')
            return await interaction.reply('Are you trying to unban the bot you doofus?')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))
            return await interaction.reply({content: 'You do not have the permission for this command', ephemeral: true})
        if (interaction.memberToUnbanID == instigator)
            return await interaction.reply({content:`you can't unban yourself dumb dumb`, ephemeral: true})

        const unbanSuccess = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`:white_check_mark: ${memberToUnbanID.tag} has been successfully unbanned | Reason: ${reason} | Instigator: ${instigator}`)

        const successfulUnbanPost = new EmbedBuilder()
        .setColor("Green")
        .setTitle('Unban')
        .setDescription('A member has been unbanned from the server')
        .addFields(
            {name: 'Unbanned:', value: `${memberToUnbanID.tag}`, inline: true},
            {name: 'Reason:', value: `${reason}`, inline: true},
            {name: 'Instigator:', value: `${interaction.member.tag}`, inline: true},
            {name: 'time', value: `<t:${Math.floor(Date.now() / 1000) + 3600}:D>`})

        await interaction.guild.bans.fetch()
        .then(async bans => {
            if (bans.size == 0) 
                return await interaction.reply({ content: `There are no bans in this server`, ephemeral: true})
            let bannedID = bans.find(ban => ban.user.id == memberToUnbanID);
            if (!bannedID) 
                return await interaction.reply({content: `There are no members with this ID who are banned from this server`, ephemeral: true})
            await interaction.guild.bans.remove(memberToUnbanID, {reason}).catch(err => {
                return interaction.reply({content: `I cannot unban this member`, ephemeral: true})
            })
            
        })

        await interaction.reply({embeds: [unbanSuccess]})
    }
}