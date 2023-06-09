const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("cosquillas")
        .setDescription("Le haces cosquillas la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que hacerle cosquillas.")
                .setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        const gifs = [
            "https://i.postimg.cc/RhhtjBXK/2.gif",
            "https://i.postimg.cc/hGndKx2S/3.gif",
            "https://i.postimg.cc/7Pt0S5ZV/5.gif",
            "https://i.postimg.cc/br5nPBBM/6.gif",
            "https://i.postimg.cc/wTSNbnJR/7.gif",
            "https://i.postimg.cc/52Lzcpq7/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le está haciendo cosquillas a ${userAct}!`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
