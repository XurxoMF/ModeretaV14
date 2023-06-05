const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const xp = require("../../utils/xpHelpers");

module.exports = {
    uso: " `[usuario]`",
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("nivel")
        .setDescription("Muestra tu nivel o el del usuario mencionado.")
        .addMentionableOption((o) =>
            o.setName("usuario").setDescription("Usuario del que quieres ver el nivel.")
        ),
    async execute(client, db, interaction) {
        const usuario = interaction.options?.getMember("usuario") || interaction.member;

        const nivel = await db.Niveles.findOne({ where: { userId: usuario.id } });

        let embed = new EmbedBuilder()
            .setTitle(`Nivel de ${usuario.displayName}`)
            .setColor("#ff00ff");

        if (nivel === null) {
            embed.setDescription(`**\`Nivel:\`** **0**\n**\`XP:\`** **0** / ${xp.xpNecesaria(0)}`);
        } else {
            let roles = ``;
            for (const lvl in xp.roles) {
                if (lvl <= nivel.nivel) {
                    for (const rol of xp.roles[lvl]) {
                        roles += `\n<@&${rol}>`;
                    }
                }
            }
            embed.setDescription(
                `**\`Nivel:\`** **${nivel.nivel}**\n**\`XP:\`** **${nivel.xp}** / ${xp.xpNecesaria(
                    nivel.nivel
                )}\n**\`Roles:\`**${roles}`
            );
        }

        interaction.reply({ embeds: [embed] });
    },
};
