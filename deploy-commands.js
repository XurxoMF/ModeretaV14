const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Colle todos os comandos da carpeta que se creou
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
            console.log(`Comando en ${filePath} cargado con éxito.`);
        } else {
            console.log(`[ADVERTENCIA] O comando en ${filePath} non contén data ou execute.`);
        }
    }
}

// Crea e prepara unha instancia do módulo REST
const rest = new REST().setToken(token);

// Deploy dos comandos
(async () => {
    try {
        // await rest
        //     .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        //     .then(() => console.log("Todos os comandos eliminados!"))
        //     .catch(console.error);

        const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log(`Refrscados con éxito ${data.length} comandos de aplicación (/)`);
    } catch (error) {
        // Xestión de erros
        console.error(error);
        console.log(`[ERRO] Ocurriu algún erro durante o proceso de refresco de comandos!`);
    }
})();
