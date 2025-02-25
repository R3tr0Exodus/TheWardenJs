const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Info")
        .setDescription("Get information from a user in your server")
        .addUserOption(option =>
            option.setName('member')
            .setDescription('choose a member to view info about')
            .setRequired(true)),


    async execute(interaction) {
        const MomberToView = interaction.options.getUser('member');
        
    }
}
    
