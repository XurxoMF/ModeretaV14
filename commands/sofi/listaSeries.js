const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 2,
    uso: " `[usuario]`",
    data: new SlashCommandBuilder()
        .setName("listaseries")
        .setDescription("Muestra las series que coleccionas tu o el usuario mencionado.")
        .addMentionableOption((o) =>
            o.setName("usuario").setDescription("Usuario para del queires ver la lista.")
        ),
    async execute(client, db, interaction) {
        const usuarioId =
            interaction.options.getMentionable("usuario")?.user.id || interaction.user.id;
        const usuarioNome =
            interaction.options.getMentionable("usuario")?.user.username ||
            interaction.user.username;

        const series = await db.SeriesUsers.findAll({ where: { userId: usuarioId } });

        // Lista de series separadas por
        let seriesString = "";
        series.forEach((serie) => {
            seriesString += `> ${serie.serie}\n`;
        });
        seriesString.trim();

        const embed = new EmbedBuilder()
            .setTitle(`Series coleccionadas por ${usuarioNome}`)
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
