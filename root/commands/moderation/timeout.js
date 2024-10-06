const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
const { execute } = require("./kick");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute/Timeout a member')
    .addUserOption(option =>
        option.setName('member')
        .setDescription('select a member to mute')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Give a reason')
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('amount')
        .setDescription('insert amount of time | insert Days(d), Hours(h) or Minutes(m) after the given number amount')
        .setRequired(false)
    ),
    async execute(interaction) {
        const memberToMute = interaction.options.getUser('member');
        const muteMember = await interaction.guild.members.fetch(memberToMute.id);
        let reason = interaction.options.getString('reason')
        const instigator = interaction.member;

        if(!reason)
            reason = 'No reason specified';
        if (memberToMute == '1290757963182641296')
            return await interaction.reply({content: 'Are you trying to mute the bot you doofus?', ephemeral:true})
        if (muteMember == instigator.id)
            return await interaction.reply({content: `You can't mute yourself`, ephemeral: true})
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers))
            return await interaction.reply({content: 'You do not have the permission for this command', ephemeral: true})


        
    }
}