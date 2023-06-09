const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("omedetou")
        .setDescription("Omedetou Shinji 👏👏")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario al felicitar.").setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`Omedetou ${userAct}! 👏`)
            .setImage("https://i.postimg.cc/X7PZ9QBj/Omedetou.gif");

        interaction.reply({
            embeds: [embed],
        });
    },
};
