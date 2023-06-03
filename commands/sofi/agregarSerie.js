const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 2,
    uso: " `<nombre serie>`",
    data: new SlashCommandBuilder()
        .setName("agregarserie")
        .setDescription(
            "Añade una serie a tu lista para recivir un aviso cuando se dropee una carta de esa esta."
        )
        .addStringOption((o) =>
            o
                .setName("serie")
                .setDescription("Serie que quieres añadir. SENSIBLE A MAYÚSCULAS!")
                .setRequired(true)
        ),
    async execute(client, db, interaction) {
        const serie = interaction.options.getString("serie");
        const userId = interaction.user.id;

        if (serie.toLowerCase() === "todo") {
            return await interaction.reply({
                content: `⚠️ <@${userId}> "**Todo**" no es un nombre de serie válido!`,
            });
        }

        const [rexistro, creado] = await db.SeriesUsers.findOrCreate({
            where: { userId: userId, serie: serie },
        });

        if (creado) {
            interaction.reply({
                content: `<@${userId}> Has agregado **${rexistro.serie}** a tu lista de series!`,
            });
        } else {
            interaction.reply({
                content: `<@${userId}> La serie **${rexistro.serie}** ya está en tu lista de series! Puedes ver tu lista con \`/listaseries\``,
            });
        }
    },
};
