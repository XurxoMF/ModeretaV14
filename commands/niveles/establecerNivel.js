const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const xp = require("../../utils/xpHelpers");

module.exports = {
    uso: " `<usuario>` `<nuevo nivel>`",
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("establecernivel")
        .setDescription("Cambia el nivel de un usuario.")
        .addMentionableOption((o) =>
            o
                .setName("usuario")
                .setDescription("Usuario del servidor al que cambiar el nivel.")
                .setRequired(true)
        )
        .addIntegerOption((o) =>
            o
                .setName("nivel")
                .setDescription("Nuevo nivel del usuario.")
                .setMinValue(1)
                .setMaxValue(1000)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
    async execute(client, db, interaction) {
        const usuario = interaction.options.getMember("usuario");
        const nivel = interaction.options.getInteger("nivel");

        try {
            const [user, creado] = await db.Niveles.findOrCreate({
                where: { userId: usuario.id },
                defaults: { xp: 0, nivel: nivel },
            });

            if (!creado) {
                await user.update({
                    xp: 0,
                    nivel: nivel,
                });
            }

            const roles = await xp.asignarRoles(usuario, nivel, true);

            let desc = ``;

            let asignados = `**Roles agregados:**`,
                quitados = `**Roles eliminados:**`;

            for (const rol of roles.asignados) {
                asignados += `\n<@&${rol}>`;
            }
            for (const rol of roles.quitados) {
                quitados += `\n<@&${rol}>`;
            }

            if (roles.asignados.length === 0 && roles.quitados.length === 0) {
                desc = `No se han agregado ni eliminado roles!`;
            } else {
                if (roles.asignados.length > 0) {
                    desc += `${asignados}\n\n`;
                }
                if (roles.quitados.length > 0) {
                    desc += `${quitados}`;
                }
            }

            const resEmbed = new EmbedBuilder()
                .setTitle("Nivel de usuario cambiado!")
                .setDescription(desc)
                .setColor("#ff00ff");

            await interaction.reply({ content: null, embeds: [resEmbed] });
        } catch (err) {
            console.log(`[ERROR] Non se puideron establecer os niveles para un usuario! ${err}`);
        }
    },
};
