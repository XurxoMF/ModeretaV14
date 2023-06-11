const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 2,
    data: new SlashCommandBuilder()
        .setName("rmdropkaruta")
        .setDescription("Activa o desactiva el recordatorio de drop de Karuta!"),
    /**
     *
     * @param {*} client
     * @param {*} db
     * @param {import("discord.js").Interaction} interaction
     */
    async execute(client, db, interaction) {
        const user = interaction.user.id;

        const existe = await db.KarutaDropReminder.findOne({
            where: { userId: user },
        });

        if (existe === null) {
            await db.KarutaDropReminder.create({ userId: user });
            interaction.reply({
                content: `<@${user}> A partir de ahora recivirás una notificación cuando tengas drop en el canal en el que dropeaste!`,
            });
        } else {
            await existe.destroy();
            interaction.reply({
                content: `<@${user}> Ya no recivirás más notificaciones cuando tengas drop en el canal en el que dropeaste!`,
            });
        }
    },
};
