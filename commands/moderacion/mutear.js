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
    uso: " `<usuario>` `<días>` `<horas>` `<minutos>` `<motivo>`",
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("mutear")
        .setDescription("Mutea a un usuario durante el tiempo especificado. Mínimo 5 minutos!")
        .addMentionableOption((o) =>
            o
                .setName("usuario")
                .setDescription("Usuario del servidor al que mutear.")
                .setRequired(true)
        )
        .addIntegerOption((o) =>
            o.setName("días").setDescription("Días de muteo.").setMinValue(0).setRequired(true)
        )
        .addIntegerOption((o) =>
            o
                .setName("horas")
                .setDescription("Horas de muteo.")
                .setMinValue(0)
                .setMaxValue(23)
                .setRequired(true)
        )
        .addIntegerOption((o) =>
            o
                .setName("minutos")
                .setDescription("Minutos de muteo.")
                .setMinValue(0)
                .setMaxValue(59)
                .setRequired(true)
        )
        .addStringOption((o) =>
            o.setName("motivo").setDescription("Por que se mutea al usuario?").setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
    async execute(client, db, interaction) {
        const muteador = interaction?.member || interaction.user;
        const muteado = interaction.options.getMember("usuario");
        const dias = interaction.options.getInteger("días");
        const horas = interaction.options.getInteger("horas");
        const minutos = interaction.options.getInteger("minutos");
        const motivo = interaction.options.getString("motivo");

        let horasFin = dias * 24 + horas;
        let minutosFin = horasFin * 60 + minutos;
        let fin = Math.round(Date.now() / 1000 + minutosFin * 60);

        //Embed conformación
        const confirmar = new EmbedBuilder()
            .setTitle("Mutear usuario!")
            .setDescription(
                `Estás seguro de que deseas mutear a <@${muteado.id}> hasta el <t:${fin}:d> a las <t:${fin}:t>?`
            )
            .setColor("#ff0000");

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
                    .setTitle("Mutear usuario!")
                    .setDescription(`Cancelado, **\`0\` usuarios** muteados.`)
                    .setColor("#ff0000");

                await i.update({
                    embeds: [cancel],
                    components: [],
                });
            } else if (i.customId === "ok") {
                const xaEstaMuted = await db.MutedMembers.findOne({
                    where: { memberId: muteado.id, muted: true },
                });

                if (xaEstaMuted !== null) {
                    //Embed xa está muted
                    const xaEstaMutedEmbed = new EmbedBuilder()
                        .setTitle("Mutear usuario!")
                        .setDescription(
                            `<@${xaEstaMuted.memberId}> ya está mutead@!
                            **\`MOTIVO:\`** ${xaEstaMuted.motivo}
                            **\`FIN DEL MUTEO:\`** <t:${xaEstaMuted.fin}:d> a las <t:${xaEstaMuted.fin}:t>`
                        )
                        .setColor("#ff0000");

                    await i.update({
                        embeds: [xaEstaMutedEmbed],
                        components: [],
                    });
                } else {
                    const mutedAplicado = await db.MutedMembers.create({
                        memberId: muteado.id,
                        fin: fin,
                        muted: true,
                        motivo: motivo,
                        muteador: muteador.id,
                    });

                    if (mutedAplicado !== null) {
                        muteado.roles.add("1111054758350962758");

                        //Embed muteado
                        const confirm = new EmbedBuilder()
                            .setTitle("Usuario muteado!")
                            .setDescription(
                                `<@${mutedAplicado.memberId}> ha sido mutead@!
                                **\`MOTIVO:\`** ${mutedAplicado.motivo}
                                **\`FIN DEL MUTEO:\`** <t:${mutedAplicado.fin}:d> a las <t:${mutedAplicado.fin}:t>`
                            )
                            .setColor("#ff0000");

                        await i.update({
                            embeds: [confirm],
                            components: [],
                        });

                        await client.channels.cache.get("1114591162779566110").send({
                            embeds: [confirm],
                        });
                    } else {
                        //Embed error
                        const error = new EmbedBuilder()
                            .setTitle("Mutear usuario!")
                            .setDescription(`ERROR, no se ha podido mutear al usuario!`)
                            .setColor("#ff0000");

                        await i.update({
                            embeds: [error],
                            components: [],
                        });
                    }
                }
            }
        });
    },
};
