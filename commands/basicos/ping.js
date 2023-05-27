const { SlashCommandBuilder } = require("discord.js");
const PingCountDB = require("../../schemas/pingCountDB");

module.exports = {
    uso: " `[mostrar ms]`",
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde con pong!")
        .addBooleanOption((o) => o.setName("ms").setDescription("Muestra o no los ms")),
    async execute(interaction) {
        const msOpcion = interaction.options.getBoolean("ms");
        const userId = interaction.user.id;

        const [rexistro, creado] = await PingCountDB.findOrCreate({
            where: { userId: userId },
            defaults: {
                usos: 1,
            },
        });

        let vecesUsado = 1;

        if (!creado) {
            await rexistro.increment({ usos: 1 });
            vecesUsado = rexistro.usos + 1;
        }

        let ping = Math.floor(interaction.client.ws.ping);

        return interaction.reply({
            content: `Pong! ${msOpcion ? `***\`${ping}\`***ms` : ""} | Usado ${vecesUsado} veces!`,
            ephemeral: true,
        });
    },
};
