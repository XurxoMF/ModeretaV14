const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ComponentType,
} = require("discord.js");

module.exports = {
    cooldown: 2,
    uso: " `<nombre serie | todo>`",
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
    async execute(client, db, interaction) {
        const serie = interaction.options.getString("serie");
        const userId = interaction.user.id;

        if (serie.toLowerCase() === "todo") {
            const ok = new ButtonBuilder()
                .setCustomId("ok")
                .setLabel("Si")
                .setStyle(ButtonStyle.Success);
            const cancel = new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel("No")
                .setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder().setComponents(ok, cancel);

            const pregunta = new EmbedBuilder()
                .setTitle("⚠️️ Eliminar todas las series ⚠️️")
                .setDescription(
                    "Estás seguro de que desas eliminar todas las series de tu lista? Esta acción no puede deshacerse!"
                )
                .setColor("#ff0000");

            const cancelado = new EmbedBuilder()
                .setTitle("⚠️ Eliminar todas las series ⚠️")
                .setDescription("Cancelado! Tus series siguen como siempre :)")
                .setColor("#ff00ff");

            const resMsg = await interaction.reply({
                embeds: [pregunta],
                components: [row],
            });

            const collector = resMsg.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000,
            });

            collector.on("collect", async (i) => {
                if (i.customId === "cancel") {
                    await i.update({
                        embeds: [cancelado],
                        components: [],
                    });
                } else if (i.customId === "ok") {
                    const cant = await db.SeriesUsers.destroy({
                        where: { userId: userId },
                    });

                    const exito = new EmbedBuilder()
                        .setTitle("⚠️ Eliminar todas las series ⚠️")
                        .setDescription(`Se han eliminado **\`${cant}\` series** de tu lista!`)
                        .setColor("#00ff00");

                    await i.update({
                        embeds: [exito],
                        components: [],
                    });
                }
            });
        } else {
            const cant = await db.SeriesUsers.destroy({
                where: { userId: userId, serie: serie },
            });

            if (cant > 0) {
                interaction.reply({
                    content: `<@${userId}> Has eliminado **${serie}** de tu lista de series!`,
                });
            } else {
                interaction.reply({
                    content: `<@${userId}> No se ha encontrado la serie **${serie}** en tu lista, usa el comando \`/listaseries\` para ver las que coleccionas!`,
                });
            }
        }
    },
};
