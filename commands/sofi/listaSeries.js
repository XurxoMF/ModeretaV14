const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const SeriesUsersDB = require("../../schemas/seriesUsersDB");

module.exports = {
    cooldown: 2,
    uso: " **`<usuario>`**",
    data: new SlashCommandBuilder()
        .setName("listaseries")
        .setDescription("Muestra las series que coleccionas tu o el usuario mencionado.")
        .addMentionableOption((o) =>
            o.setName("usuario").setDescription("Usuario para del queires ver la lista.")
        ),
    async execute(interaction) {
        const usuarioId = interaction.options.getMentionable("usuario").id || interaction.user.id;
        const usuarioNome =
            interaction.options.getMentionable("usuario").user.username ||
            interaction.user.username;

        const series = await SeriesUsersDB.findAll({ where: { userId: usuario.id } });

        // Lista de series separadas por
        let seriesString = "";
        series.forEach((serie) => {
            seriesString += `> ${serie.serie}\n`;
        });
        seriesString.trim();

        const embed = new EmbedBuilder()
            .setTitle(`Series coleccionadas por ${usuario.username}`)
            .setDescription(
                seriesString.length >= 1
                    ? seriesString
                    : "**Este usuario no colecciona ninguna serie!**"
            )
            .setColor("#a30584");

        interaction.reply({
            embeds: [embed],
        });
    },
};
