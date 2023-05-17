const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde con pong!")
        .addBooleanOption((o) => o.setName("ms").setDescription("Muestra o no los ms")),
    async execute(interaction) {
        const msOpcion = interaction.options.getBoolean("ms");

        if (msOpcion) {
            let ping = Math.floor(interaction.client.ws.ping);
            return interaction.reply({
                content: "Pong! ***`" + ping + "ms`***",
                ephemeral: true,
            });
        } else {
            return interaction.reply({ content: "Pong!", ephemeral: true });
        }
    },
};
