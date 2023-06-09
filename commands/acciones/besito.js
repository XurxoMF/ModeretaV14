const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("besito")
        .setDescription(
            "Le das un besito en la frente o la mejilla a la persona a la que menciones."
        )
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que darle un besito.")
                .setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        const gifs = [
            "https://i.postimg.cc/RVZf7WPR/1.gif",
            "https://i.postimg.cc/TPgWdgwR/2.gif",
            "https://i.postimg.cc/t41xcLGn/3.gif",
            "https://i.postimg.cc/85GfjcJL/4.gif",
            "https://i.postimg.cc/Z51dzVJ7/5.gif",
            "https://i.postimg.cc/YqDFbtZw/6.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le ha dado un besito a ${userAct} UwU`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
