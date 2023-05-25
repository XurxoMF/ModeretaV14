const { Events, ActivityType } = require("discord.js");
const db = require("../sequelize");
const PingCountDB = require("../schemas/pingCountDB");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // Test conexión Sequelize
        try {
            await db.authenticate();
            console.log("ModeretaDB conectada con éxito!");
        } catch (error) {
            console.error("[ERROR] ModeretaDB non se puido conectar:", error);
        }

        // Sicronización de tablas.
        try {
            await PingCountDB.sync();
            console.log("PingCountDB lista!");
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
