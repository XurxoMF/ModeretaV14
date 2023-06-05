const { Events, Collection } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(client, db, interaction) {
        const cooldowns = client.cooldowns;

        if (!interaction.isChatInputCommand()) return;

        const comando = interaction.client.comandos.get(interaction.commandName);

        if (!comando) {
            console.error(`No existe ningún comando con el nombre ${interaction.commandName}!`);
            return;
        }

        if (!cooldowns.has(comando.data.name)) {
            cooldowns.set(comando.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(comando.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (comando.cooldown || defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Comando \`${comando.data.name}\` en enfriamiento!. Puedes usarlo de nuevo en <t:${expiredTimestamp}:R>.`,
                    ephemeral: true,
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // EXECUCIÓN
        try {
            //if (interaction.user.id === "556249326951727115") {
            await comando.execute(client, db, interaction);
            //} else {
            //    interaction.reply("Comando desactivado por mantenimiento!");
            //}
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "Ups! Ha ocurrido un error al ejecutar el comando!",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "Ups! Ha ocurrido un error al ejecutar el comando!",
                    ephemeral: true,
                });
            }
        }
    },
};
