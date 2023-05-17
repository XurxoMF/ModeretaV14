const { Events } = require("discord.js");
const { cooldowns } = client;

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No existe ningún comando con el nombre ${interaction.commandName}!`);
            return;
        }

        // COOLDOWNS
        client.cooldowns = new Collection();

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Comando \`${command.data.name}\` en enfriamiento!. Puedes usarlo de nuevo en <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // EXECUCIÓN
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
