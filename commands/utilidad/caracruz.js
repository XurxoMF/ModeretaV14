const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("caracruz")
        .setDescription("Juega al cara o cruz.")
        .addStringOption((str1) =>
            str1
                .setName("cara")
                .setDescription("Cara de la moneda.")
                .setRequired(true)
        )
        .addStringOption((str2) =>
            str2
                .setName("cruz")
                .setDescription("Cruz de la moneda.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const cara = interaction.options.getString("cara", true);
        const cruz = interaction.options.getString("cruz", true);

        const caracruz = [`**Cara** (${cara})`, `**Cruz** (${cruz})`];
        const resultado = caracruz[Math.floor(Math.random() * caracruz.length)];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .addFields(
                { name: "Cara:", value: cara, inline: true },
                { name: "Cruz:", value: cruz, inline: true }
            )
            .addField("Ganador:", resultado);

        interaction.reply({ embeds: [embed] });
    },
};
