const { SlashCommandBuilder } = require("discord.js");
const SeriesUsersDB = require("../../schemas/seriesUsersDB");

module.exports = {
    cooldown: 2,
    uso: " **`<nombre serie>`**",
    data: new SlashCommandBuilder()
        .setName("eliminarserie")
        .setDescription(
            "Elimina una serie de tu lista. Ya no reciviras notificaciones para esta serie!"
        )
        .addStringOption((o) =>
            o
                .setName("serie")
                .setDescription("Serie que quieres eliminar. SENSIBLE A MAYÚSCULAS!")
                .setRequired(true)
        ),
    async execute(interaction) {
        const serie = interaction.options.getString("serie");
        const userId = interaction.user.id;

        const cant = await SeriesUsersDB.destroy({
            where: { userId: userId, serie: serie },
        });

        if (cant > 0) {
            interaction.reply({
                content: `<@${userId}> Has eliminado **${serie}** de tu lista de series!`,
            });
        } else {
            interaction.reply({
                content: `<@${userId}> No se ha encontrado la series **${serie}** en tu lista, usa el comando \`/listaseries\` para ver las que coleccionas!`,
            });
        }
    },
};
