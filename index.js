const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const config = require("./config.json");
const db = require("./schemas");

// Creción dun cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

// TEMPORIZADORES
setInterval(async () => {
    // MUTEOS
    const muteados = await db.MutedMembers.findAll({
        where: { muted: true },
    });

    for (const muteado of muteados) {
        if (muteado.fin * 1000 < Date.now()) {
            const updated = await muteado.update({
                muted: false,
            });

            const member = client.guilds.cache
                .get("726133117722820671")
                .members.cache?.get(`${muteado.memberId}`);

            if (member !== undefined) {
                member.roles.remove("1111054758350962758");
            }

            //Embed desmuteado
            const embedUnmute = new EmbedBuilder()
                .setTitle("Usuario desmuteado!")
                .setDescription(`<@${updated.memberId}> ha sido desmutead@!`)
                .setColor("#00ff00");

            await client.channels.cache.get("1114591162779566110").send({
                embeds: [embedUnmute],
            });
        }
    }
    // END MUTEOS
}, 300_000);
// END TEMPORIZADORES

// COOLDOWNS
client.cooldowns = new Collection();

// Importación de comandos e colección para estes
client.comandos = new Collection();

const rutaCarpetas = path.join(__dirname, "commands");
const carpetasComandos = fs.readdirSync(rutaCarpetas);

for (const carpeta of carpetasComandos) {
    const rutaComandos = path.join(rutaCarpetas, carpeta);
    const archivosComandos = fs.readdirSync(rutaComandos).filter((file) => file.endsWith(".js"));
    for (const archivo of archivosComandos) {
        const rutaArchivo = path.join(rutaComandos, archivo);
        const comando = require(rutaArchivo);
        // Establece un novo item na colección de comandos con key = nome e value = módulo exportado
        if ("data" in comando && "execute" in comando) {
            client.comandos.set(comando.data.name, comando);
            console.log(`Comando en ${rutaArchivo} cargado con éxito.`);
        } else {
            console.log(`[ADVERTENCIA] O comando en ${rutaArchivo} non contén data ou execute.`);
        }
    }
}

// Importación de eventos
const rutaEventos = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(rutaEventos).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(rutaEventos, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, db, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, db, ...args));
    }
}

// Conexión a Discord co token do cliente
client.login(config.token);
