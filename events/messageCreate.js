const {
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    Client,
    Message,
} = require("discord.js");
const xp = require("../utils/xpHelpers");
const cooldowns = new Set();

module.exports = {
    name: Events.MessageCreate,
    /**
     *
     * @param {Client} client
     * @param {db} db
     * @param {Message} message
     * @returns
     */
    async execute(client, db, message) {
        if (message.author.id === "748161670945177641") return;

        // MÚSICA
        if (message.channel.id === "726155485236953088") {
            if (
                [
                    "https://www.youtube.com/watch",
                    "https://open.spotify.com",
                    "https://youtu.be",
                    "https://music.youtube.com/watch",
                ].some((l) => message.content.includes(l))
            ) {
                await message.react("👍");
                await message.react("👎");
            }
        }
        // END MÚSICA

        // SERIES USERS DROP
        //Sofu = 950166445034188820
        //Gio = 556249326951727115
        if (message.author.id === "950166445034188820") {
            let series = [];
            let userIds = new Set();

            if (message.content.includes(", we've found the following cards for you")) {
                // drop normal
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

            if (series.length > 0) {
                // busca os usuarios que coleccionan as series dropeadas
                const res = await db.SeriesUsers.findAll({
                    where: {
                        serie: {
                            [db.Sequelize.Op.or]: [
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[0]
                                ),
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[1]
                                ),
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[2]
                                ),
                            ],
                        },
                    },
                });

                const users = [...res];
                const userSeries = {};

                for (const u of users) {
                    const id = u.getDataValue("userId");
                    const serie = u.getDataValue("serie").toLowerCase();
                    userIds.add(id);
                    if (userSeries[serie] === undefined) {
                        userSeries[serie] = [id];
                    } else {
                        userSeries[serie].push(id);
                    }
                }

                // envía pings as persoas cas series na súa lista
                if (userIds.size > 0) {
                    let res = "";
                    for (const uid of userIds) {
                        res += `<@${uid}> `;
                    }

                    const boton = new ButtonBuilder()
                        .setCustomId("lista_series")
                        .setLabel("📑")
                        .setStyle(ButtonStyle.Primary);
                    const row = new ActionRowBuilder().addComponents(boton);

                    const resMes = await message.reply({
                        content: `${res}se dropearon cartas de tu lista!`,
                        components: [row],
                    });

                    const collector = resMes.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                        idle: 50_000,
                    });

                    collector.on("collect", async (i) => {
                        const fields = [];
                        for (const s in userSeries) {
                            let line = ``;
                            for (const uid of userSeries[s]) {
                                line += `<@${uid}>, `;
                            }
                            line = line.slice(0, -2);
                            fields.push({ name: s, value: line });
                        }

                        const embed = new EmbedBuilder()
                            .setTitle("Series coleccionadas por cada usuario:")
                            .setColor("#a30584")
                            .addFields(...fields);

                        i.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                    });
                }
            }
        }
        // END SERIES USERS DROP

        // KARUTA DROP PING
        if (
            message.author.id === "646937666251915264" &&
            message.content.includes("I'm dropping 3 cards since this server is currently active!")
        ) {
            message.reply({ content: "<@&1096463668977336383> Karuta está dropeando cartas!" });
        }
        // END KARUTA DROP PING

        // NIVELES
        if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

        xp.subirXp(client, db, message);

        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 60000);
        // NIVELES
    },
};
