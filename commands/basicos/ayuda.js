const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    SlashCommandBuilder,
    EmbedBuilder,
    ComponentType,
} = require("discord.js");
const fs = require("node:fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ayuda")
        .setDescription("Muestra información sobre los comandos qde Moderēta."),
    async execute(client, db, interaction) {
        //nomes => ({ carpeta: "comando1, comando2,..., comandoN" })
        const nomes = {},
            //info => ({ carpeta: [ { name: /nome, value: descripcion }, { name: /nome, value: descripcion }, ... ] })
            info = {};

        // Recuperación e gardado dos comandos en obxetos
        const carpetasComandos = fs.readdirSync("./commands");
        for (const carpeta of carpetasComandos) {
            nomes[carpeta] = "";
            info[carpeta] = [];
            const archivosComandos = fs
                .readdirSync(`./commands/${carpeta}`)
                .filter((file) => file.endsWith(".js"));
            for (const archivo of archivosComandos) {
                const comando = require(`../../commands/${carpeta}/${archivo}`);
                if ("data" in comando && "execute" in comando) {
                    const nome = comando.data.name;
                    const descripcion = comando.data.description;
                    const uso = comando.uso || "";
                    // Nomes dos comandos embes base.
                    nomes[carpeta] += `${nome}, `;
                    // Info completa comandos.
                    info[carpeta].push({
                        name: `/${nome}${uso}`,
                        value: descripcion,
                    });
                }
            }
            nomes[carpeta] = nomes[carpeta].slice(0, -2);
        }

        // Embed BASE
        const baseEmbed = new EmbedBuilder()
            .setTitle("AYUDA - LISTA DE COMANDOS")
            .setColor("#a30584")
            .setDescription(
                `**Básicos** 🌍
                \`\`\`${nomes["basicos"]}\`\`\`
                **Moderación** ⚒️
                \`\`\`${nomes["moderacion"]}\`\`\`
                **Niveles** 🆙
                \`\`\`${nomes["niveles"]}\`\`\`
                **Acciones** 🤙
                \`\`\`${nomes["acciones"]}\`\`\`
                **Reacciones** 🤝
                \`\`\`${nomes["reacciones"]}\`\`\`
                **Utilidad** ✅
                \`\`\`${nomes["utilidad"]}\`\`\`
                **Sofi** 🍑
                \`\`\`${nomes["sofi"]}\`\`\``
            )
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({
                text: "Usa el desplegable para ver con más detalles cada una de las categorías",
            });

        // Frases predefinidas
        const paramType = "<obligatorio> | [opcional]";

        // Embed BÁSICOS
        const basicosEmbed = new EmbedBuilder()
            .setTitle("AYUDA - BÁSICOS 🌍")
            .setColor("#a30584")
            .addFields(...info["basicos"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed MODERACIÓN
        const moderacionEmbed = new EmbedBuilder()
            .setTitle("AYUDA - MODERACIÓN ⚒️")
            .setColor("#a30584")
            .addFields(...info["moderacion"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed NIVELES
        const nivelesEmbed = new EmbedBuilder()
            .setTitle("AYUDA - NIVELES 🆙")
            .setColor("#a30584")
            .addFields(...info["niveles"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed ACCIONES
        const accionesEmbed = new EmbedBuilder()
            .setTitle("AYUDA - ACCIONES 🤙")
            .setColor("#a30584")
            .addFields(...info["acciones"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed REACCIONES
        const reaccionesEmbed = new EmbedBuilder()
            .setTitle("AYUDA - REACCIONES 🤝")
            .setColor("#a30584")
            .addFields(...info["reacciones"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed UTILIDAD
        const utilidadEmbed = new EmbedBuilder()
            .setTitle("AYUDA - UTILIDAD ✅")
            .setColor("#a30584")
            .addFields(...info["utilidad"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Embed SOFI
        const sofiEmbed = new EmbedBuilder()
            .setTitle("AYUDA - SOFI 🍑")
            .setColor("#a30584")
            .addFields(...info["sofi"])
            .setThumbnail("https://i.postimg.cc/ZY8nQy6v/info.png")
            .setFooter({ text: paramType });

        // Menú de selección e fila de componentes
        const select = new StringSelectMenuBuilder()
            .setCustomId("ayuda_categoria")
            .setPlaceholder("Selecciona categoría")
            .addOptions(
                new StringSelectMenuOptionBuilder().setLabel("Básicos 🌍").setValue("basicos"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Moderación ⚒️")
                    .setValue("moderacion"),
                new StringSelectMenuOptionBuilder().setLabel("Niveles 🆙").setValue("niveles"),
                new StringSelectMenuOptionBuilder().setLabel("Acciones 🤙").setValue("acciones"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Reacciones 🤝")
                    .setValue("reacciones"),
                new StringSelectMenuOptionBuilder().setLabel("Utilidad ✅").setValue("utilidad"),
                new StringSelectMenuOptionBuilder().setLabel("Sofi 🍑").setValue("sofi"),
                new StringSelectMenuOptionBuilder().setLabel("Inicio").setValue("inicio")
            );
        const row = new ActionRowBuilder().addComponents(select);

        const mensaje = await interaction.reply({
            embeds: [baseEmbed],
            components: [row],
        });

        // Filtro e collector de interaccións co desplegable
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = mensaje.createMessageComponentCollector({
            filter,
            componentType: ComponentType.StringSelect,
            idle: 60_000,
        });

        // Evento recolección de seleccións
        collector.on("collect", async (i) => {
            const opcion = i.values[0];

            // Actualizar embed dependendo da opción.
            // Añadir case "StringSelectMenuOptionBuilder().setValue("ESTE VALOR") para un novo embed."
            switch (opcion) {
                case "inicio":
                    i.update({ embeds: [baseEmbed] });
                    break;
                case "basicos":
                    i.update({ embeds: [basicosEmbed] });
                    break;
                case "moderacion":
                    i.update({ embeds: [moderacionEmbed] });
                    break;
                case "niveles":
                    i.update({ embeds: [nivelesEmbed] });
                    break;
                case "acciones":
                    i.update({ embeds: [accionesEmbed] });
                    break;
                case "reacciones":
                    i.update({ embeds: [reaccionesEmbed] });
                    break;
                case "utilidad":
                    i.update({ embeds: [utilidadEmbed] });
                    break;
                case "sofi":
                    i.update({ embeds: [sofiEmbed] });
                    break;
                default:
                    i.update({ embeds: [baseEmbed] });
                    break;
            }
        });

        // Evento final de seleccións
        // collector.on("end", async (c) => {
        //     interaction.editReply({ components: [] });
        // });
    },
};
