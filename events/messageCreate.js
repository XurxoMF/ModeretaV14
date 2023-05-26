const { Events } = require("discord.js");
const SeriesUsersDB = require("../schemas/seriesUsersDB");
const sequelize = require("../sequelize");

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

        // SERIES USERS DROP
        if (message.author.id === "950166445034188820") {
            let series = [];
            let userIds = new Set();

            // drop normal
            if (message.content.includes(", we've found the following cards for you")) {
                const regex = /\* • \*.*\*/gim;
                const seriesConAster = [...(await message.content.matchAll(regex))];
                seriesConAster.forEach((s) => {
                    series.push(s[0].slice(5, -1).toLowerCase());
                });
            } else if (message.content.includes("[3]")) {
                // drop de series
                const regex = /\*\*.*\*\*/gim;
                const seriesConAster = [...(await message.content.matchAll(regex))];
                seriesConAster.forEach((s) => {
                    series.push(s[0].slice(2, -2).toLowerCase());
                });
            } else if (message.content.includes("[1]")) {
                // captcha drop
                const regex = /\* • \*.*\*/gim;
                const serieConAster = [...(await message.content.matchAll(regex))];
                series.push(serieConAster[0][0].slice(5, -1).toLowerCase());
            }

            // busca os usuarios que coleccionan as series dropeadas
            const getUsers = async () => {
                const users = [];
                for (const s of series) {
                    const res = await SeriesUsersDB.findAll({
                        where: {
                            serie: sequelize.where(
                                sequelize.fn("LOWER", sequelize.col("serie")),
                                "LIKE",
                                s
                            ),
                        },
                    });
                    users.push(...res);
                }
                return users;
            };

            // Usuarios con "userId"
            const users = await getUsers();

            for (const u of users) {
                userIds.add(u.getDataValue("userId"));
            }

            // envía pings as persoas cas series na súa lista
            if (userIds.size > 0) {
                let res = "";
                for (const uid of userIds) {
                    res += `<@${uid}> `;
                }

                message.reply({
                    content: `${res}se dropearon cartas de tu lista!`,
                });
            }
        }
        // END SERIES USERS DROP
    },
};
