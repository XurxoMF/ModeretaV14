const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("puñetazo")
        .setDescription("Le pegas un puñetazo al usuario que menciones.")
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que le quieres pegar un puñetazo.")
                .setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Por que te pegas a ti mismo?",
            });
        }

        const gifs = [
            "https://i.postimg.cc/QdSVpPXT/1.gif",
            "https://i.postimg.cc/bJZGYTf2/2.gif",
            "https://i.postimg.cc/nhnC9Ztx/3.gif",
            "https://i.postimg.cc/rwywFJSF/4.gif",
            "https://i.postimg.cc/6343xpCr/5.gif",
            "https://i.postimg.cc/KvSKFBqR/6.gif",
            "https://i.postimg.cc/RC3fvMvb/7.gif",
            "https://i.postimg.cc/hGyzqY6B/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ha pegado un puñetazo a ${userAct}! Eso tuvo que doler 😵‍💫`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
