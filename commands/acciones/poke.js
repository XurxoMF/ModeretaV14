const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " **`<usuario>`**",
    data: new SlashCommandBuilder()
        .setName("poke")
        .setDescription("Pinchas con el dedo a la persona a la que mencionas.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario que será pokeado.").setRequired(true)
        ),
    async execute(interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Poke a ti mismo? Que raro 🤔",
            });
        }

        const gifs = [
            "https://i.postimg.cc/Nf73Fv4R/1.gif",
            "https://i.postimg.cc/X7bMnYwV/2.gif",
            "https://i.postimg.cc/Qdfvggvt/3.gif",
            "https://i.postimg.cc/0ykLJXWF/4.gif",
            "https://i.postimg.cc/Pqcc9XXn/5.gif",
            "https://i.postimg.cc/g0rQgXPK/6.gif",
            "https://i.postimg.cc/tTxfHKJZ/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ha pinchado a ${userAct}!`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
