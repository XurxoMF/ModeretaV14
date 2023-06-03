const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("asesinar")
        .setDescription("Asesinas a la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario al que asesinar.").setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "No puedes, simplemente no puedes.",
            });
        }

        const gifs = [
            "https://i.postimg.cc/FFbcnTpT/1.gif",
            "https://i.postimg.cc/CKWD9t9Q/2.gif",
            "https://i.postimg.cc/YCDQzjRk/3.gif",
            "https://i.postimg.cc/J0QkDh0f/4.gif",
            "https://i.postimg.cc/fLmXsCNT/5.gif",
            "https://i.postimg.cc/hGJTygZm/6.gif",
            "https://i.postimg.cc/sDcY1TZM/7.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ha asesinado a ${userAct} X_X`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
