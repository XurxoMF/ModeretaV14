const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("invitación")
        .setDescription("Envía una invitación al servidor que no expira!"),
    async execute(client, db, interaction) {
        const wait = require("node:timers/promises").setTimeout;

        await interaction.reply("https://discord.gg/ZvB55s4");
        await wait(30000);
        await interaction.deleteReply();
        return;
    },
};
