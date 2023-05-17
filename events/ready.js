const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Lista! Funcionando como ${c.user.tag}`);
    },
};
