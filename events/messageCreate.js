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

        // PING DROPS SOFI
        if (
            message.channel.id === "1101853797573206016" &&
            message.author.id === "1128578188503683092"
        ) {
            const embed = message.embeds.length >= 1 ? message.embeds[0] : undefined;

            if (embed !== undefined) {
                if (embed.title === "Captcha Drop") {
                    message.reply({
                        content: `<@&1096410227408121898> **Captcha Drop** disponible!`,
                    });
                } else if (embed.title === "SOFI: MINIGAME") {
                    message.reply({
                        content: `<@&1096410227408121898> **Minijuego** desponible!`,
                    });
                } else if (
                    embed.description.includes("I will drop cards from the most voted series")
                ) {
                    message.reply({
                        content: `<@&1096410227408121898> **Drop de Series** desponible!`,
                    });
                }
            }
        }

        // SERIES DROP
        //Sofu = 950166445034188820
        //Gio = 556249326951727115
        if (message.author.id === "950166445034188820") {
            const msgCont = message.content;

            let series = [];

            let userIds = new Set();

            if (
                message.author.id === "950166445034188820" &&
                message.content.startsWith("> ") &&
                message.content.includes("has dropeado estas cartas!")
            ) {
                const frases = message.content.split("\n");
                for (const frase of frases) {
                    console.log(frase);
                    if (frase.startsWith("> ")) {
                        console.log(frase.split(" • ")[2]);
                        series.push(frase.split(" • ")[2]);
                    }
                }
            }

            // if (message.content.includes("")) {
            //     // drop normal SOFU
            //     const frases = message.content.split("\n");
            //     for (let i = 1; i < frases.length; i++) {
            //         series.push(frases[i].split(" • ")[2].slice(1, -1));
            //     }
            // } else if (
            //     message.content.includes("**") &&
            //     message.content.startsWith("`1]`") &&
            //     message.content.includes("ɢ")
            // ) {
            //     // drop de char-serie por actividade
            //     const lineas = message.content.split("\n");
            //     for (const linea of lineas) {
            //         series.push(linea.split("•")[4].trim());
            //     }
            // } else if (
            //     message.content.includes("**") &&
            //     message.content.startsWith("`1]`") &&
            //     !message.content.includes("ɢ")
            // ) {
            //     // drop de char-serie por actividade sin g
            //     const lineas = message.content.split("\n");
            //     for (const linea of lineas) {
            //         series.push(linea.split("•")[3].trim());
            //     }
            // } else if (!message.content.includes("**") && message.content.startsWith("`1]`")) {
            //     // drop de serie por actividade
            //     const lineas = message.content.split("\n");
            //     for (const linea of lineas) {
            //         series.push(linea.split("•")[2].trim());
            //     }
            // }

            if (series.length > 0) {
                // busca os usuarios que coleccionan as series dropeadas
                const res = await db.SeriesUsers.findAll({
                    where: {
                        serie: {
                            [db.Sequelize.Op.or]: [
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[0]?.toLowerCase()
                                ),
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[1]?.toLowerCase()
                                ),
                                db.sequelize.where(
                                    db.sequelize.fn("LOWER", db.sequelize.col("serie")),
                                    "LIKE",
                                    series[2]?.toLowerCase()
                                ),
                            ],
                        },
                    },
                });

                const users = [...res];

                for (const u of users) {
                    const id = u.getDataValue("userId");
                    userIds.add(id);
                }

                for (const u of users) {
                    const id = u.getDataValue("userId");
                    userIds.add(id);
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
                        // preparar obxeto de series
                        const userSeries = {};
                        for (const s of series) {
                            userSeries[s] = [];
                            for (const u of users) {
                                if (u.getDataValue("serie").toLowerCase() === s.toLowerCase()) {
                                    userSeries[s].push(u.getDataValue("userId"));
                                }
                            }
                        }

                        // preparar embed
                        const fields = [];
                        for (const s in userSeries) {
                            let line = ``;
                            if (userSeries[s].length === 0) {
                                line = `\`Sin usuarios\`, `;
                            } else {
                                for (const uid of userSeries[s]) {
                                    line += `<@${uid}>, `;
                                }
                            }
                            line = line.slice(0, -2);
                            fields.push({ name: s, value: line });
                        }

                        const embed = new EmbedBuilder()
                            .setTitle("Series coleccionadas por cada usuario:")
                            .setColor("#a30584")
                            .addFields(...fields);

                        try {
                            i.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        } catch (err) {
                            i.reply({
                                content: "Ha ocurrido un error, inténtalo de nuevo ^^",
                                ephemeral: true,
                            });
                        }
                    });
                }
            }
        }

        // KARUTA DROP PING
        if (
            message.author.id === "646937666251915264" &&
            message.content.includes("I'm dropping 3 cards since this server is currently active!")
        ) {
            message.reply({ content: "<@&1096463668977336383> Karuta está dropeando cartas!" });
        }
        // END KARUTA DROP PING

        // KARUTA DROP REMINDER
        if (
            message.author.id === "646937666251915264" &&
            message.content.includes(" is dropping ")
        ) {
            const user = message.content.split(" ")[0].slice(2, -1);

            const noti = await db.KarutaDropReminder.findOne({
                where: { userId: user },
            });

            if (noti !== null) {
                setTimeout(() => {
                    message.channel.send({ content: `<@${user}> ya puedes dropear de nuevo!` });
                }, 1_800_000);
            }
        }
        // END KARUTA DROP REMINDER

        // NIVELES
        if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

        xp.subirXp(client, db, message);

        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 30_000);
        // NIVELES
    },
};
