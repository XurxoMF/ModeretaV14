const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<cara>` `<cruz>`",
    data: new SlashCommandBuilder()
        .setName("caracruz")
        .setDescription("Juega al cara o cruz.")
        .addStringOption((str1) =>
            str1.setName("cara").setDescription("Cara de la moneda.").setRequired(true)
        )
        .addStringOption((str2) =>
            str2.setName("cruz").setDescription("Cruz de la moneda.").setRequired(true)
        ),
    async execute(client, db, interaction) {
        const cara = interaction.options.getString("cara", true);
        const cruz = interaction.options.getString("cruz", true);

        const caracruz = [`**Cara** (${cara})`, `**Cruz** (${cruz})`];
        const resultado = caracruz[Math.floor(Math.random() * caracruz.length)];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .addFields(
                { name: "Cara:", value: cara, inline: true },
                { name: "Cruz:", value: cruz, inline: true },
                { name: "Ganador:", value: resultado }
            )
            .setThumbnail("https://i.postimg.cc/WbnP7DXw/caracruz.gif");

        interaction.reply({ embeds: [embed] });
    },
};
