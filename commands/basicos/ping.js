const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    uso: " `[mostrar ms]`",
    cooldown: 10,
    data: new SlashCommandBuilder().setName("ping").setDescription("Responde con pong!"),
    async execute(client, db, interaction) {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    },
};
