const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No existe ningún comando con el nombre ${interaction.commandName}!`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "Ups! Ha ocurrido un error al ejecutar el comando!", ephemeral: true });
            } else {
                await interaction.reply({ content: "Ups! Ha ocurrido un error al ejecutar el comando!", ephemeral: true });
            }
        }
    },
};
