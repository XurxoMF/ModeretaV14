const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ComponentType,
} = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("desmutear")
        .setDescription("Desmutea a un usuario!")
        .addMentionableOption((o) =>
            o
                .setName("usuario")
                .setDescription("Usuario del servidor al que desmutear.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
    async execute(client, db, interaction) {
        const muteador = interaction?.member || interaction.user;
        const muteado = interaction.options.getMember("usuario");

        //Embed conformación
        const confirmar = new EmbedBuilder()
            .setTitle("Desmutear usuario!")
            .setDescription(`Estás seguro de que deseas desmutear a <@${muteado.id}>?`)
            .setColor("#00ff00");

        // Botóns e fila
        const ok = new ButtonBuilder()
            .setCustomId("ok")
            .setLabel("Si")
            .setStyle(ButtonStyle.Success);
        const cancel = new ButtonBuilder()
            .setCustomId("cancel")
            .setLabel("No")
            .setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder().setComponents(ok, cancel);

        const resMsg = await interaction.reply({
            embeds: [confirmar],
            components: [row],
        });

        const collector = resMsg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 30_000,
        });

        collector.on("collect", async (i) => {
            if (i.customId === "cancel") {
                //Embed cancelado
                const cancel = new EmbedBuilder()
                    .setTitle("Desmutear usuario!")
                    .setDescription(`Cancelado, **\`0\` usuarios** desmuteados.`)
                    .setColor("#00ff00");

                await i.update({
                    embeds: [cancel],
                    components: [],
                });
            } else if (i.customId === "ok") {
                const xaEstaMuted = await db.MutedMembers.findOne({
                    where: { memberId: muteado.id, muted: true },
                });

                if (xaEstaMuted === null) {
                    //Embed xa está muted
                    const xaEstaMutedEmbed = new EmbedBuilder()
                        .setTitle("Desmutear usuario!")
                        .setDescription(`<@${muteado.id}> no está mutead@!`)
                        .setColor("#00ff00");

                    await i.update({
                        embeds: [xaEstaMutedEmbed],
                        components: [],
                    });
                } else {
                    const desmuted = await xaEstaMuted.update({
                        muted: false,
                    });

                    muteado.roles.remove("1111054758350962758");

                    //Embed desmuteado
                    const confirm = new EmbedBuilder()
                        .setTitle("Usuario desmuteado!")
                        .setDescription(`<@${desmuted.memberId}> ha sido desmutead@!`)
                        .setColor("#00ff00");

                    await i.update({
                        embeds: [confirm],
                        components: [],
                    });

                    await client.channels.cache.get("1114591162779566110").send({
                        embeds: [confirm],
                    });
                }
            }
        });
    },
};
