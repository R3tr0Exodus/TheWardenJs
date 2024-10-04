const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Should reply pong'),
    async execute(interaction){
        interaction.reply('Pong!');
    },
};