const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder().setName("servidor").setDescription("Muestra información sobre el servidor."),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        await interaction.reply(`Estás en ${interaction.guild.name} tiene ${interaction.guild.memberCount} miembros.`);
    },
};
