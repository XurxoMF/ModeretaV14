const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " **`<usuario>`**",
    data: new SlashCommandBuilder()
        .setName("beso")
        .setDescription("Le das un beso a la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario al que besar.").setRequired(true)
        ),
    async execute(interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Es un poco difícil que te beses a ti mismo no crees?",
            });
        }

        const gifs = [
            "https://i.postimg.cc/Vsp0djdq/1.gif",
            "https://i.postimg.cc/K8yK5x74/2.gif",
            "https://i.postimg.cc/QdkF4wSm/3.gif",
            "https://i.postimg.cc/Y9SLmR63/4.gif",
            "https://i.postimg.cc/rF40WKrv/6.gif",
            "https://i.postimg.cc/br7ZWjKC/7.gif",
            "https://i.postimg.cc/3Rb4jG9H/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le ha dado un beso a ${userAct} <3`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
