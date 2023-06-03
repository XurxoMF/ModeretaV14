const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client, db) {
        // Test conexión Sequelize
        try {
            await db.sequelize.authenticate();
            console.log("ModeretaDB conectada con éxito!");
        } catch (error) {
            console.error("[ERROR] ModeretaDB non se puido conectar:", error);
        }

        // Sicronización de tablas.
        try {
            await db.sequelize.sync();
            console.log("Tablas cargadas con éxito!");
        } catch (err) {
            console.error("[ERROR] Algunha tabla non se puido (re)crear correctamente:", err);
        }

        // Log e estado :)
        console.log("Preparada! UwU");
        client.user.setPresence({
            activities: [
                {
                    name: `todo en Astro Vaporwave!`,
                    type: ActivityType.Watching,
                },
            ],
        });
    },
};
