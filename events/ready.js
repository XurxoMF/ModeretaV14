const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
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
