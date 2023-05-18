const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(client, message) {
        if (message.author.id === "748161670945177641") return;

        // MÚSICA
        const enlacesMusica = [
            "https://www.youtube.com/watch",
            "https://open.spotify.com",
            "https://youtu.be",
            "https://music.youtube.com/watch",
        ];

        if (message.channel.id === "726155485236953088") {
            if (enlacesMusica.some((l) => message.content.includes(l))) {
                await message.react("👍");
                await message.react("👎");
            }
        }
        // END MÚSICA

        // RAID PING
        if (
            message.channel.id === "1108453318130409512" &&
            message.author.id === "1108366419466395760"
        ) {
            message.reply("<@&1100136018096705566> Nueva Raid!");
        }
        // END RAID PING
    },
};
