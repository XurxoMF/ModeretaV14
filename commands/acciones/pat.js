const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("pat")
        .setDescription("Le hacer pat pat a la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que hacerle pat pat.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Estás falto de cariño?? Que alguien le de haga pat pat!! :)",
            });
        }
        const gifs = [
            "https://i.postimg.cc/9fxFsqSg/1.gif",
            "https://i.postimg.cc/909m4gfs/2.gif",
            "https://i.postimg.cc/Px9f5ndm/3.gif",
            "https://i.postimg.cc/kXxMqHzb/4.gif",
            "https://i.postimg.cc/g2H0q7KW/5.gif",
            "https://i.postimg.cc/Z54bRczD/6.gif",
            "https://i.postimg.cc/W3hbV1cN/7.gif",
            "https://i.postimg.cc/59QNkymp/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le hizo pat pat a ${userAct}`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
