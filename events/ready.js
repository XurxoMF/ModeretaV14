const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log("Preparada! UwU");
        client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "todo en Astro Vaporwave",
                    type: "WATCHING",
                },
            ],
        });
    },
};
