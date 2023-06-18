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

client.rest.on("rateLimited", (info) => console.log("rate limited"));

// TEMPORIZADORES
setInterval(async () => {}, 300_000);
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
