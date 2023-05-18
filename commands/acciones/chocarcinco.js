const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chocarcinco")
        .setDescription("Le chocas los cinco a la persona a la que mencionas.")
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que le chocas los cinco.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content:
                    "Te chocas los cinco a si mismo, tan solo te has quedado? ;-;",
            });
        }

        const gifs = [
            "https://i.postimg.cc/d3YXB5Bb/1.gif",
            "https://i.postimg.cc/h4LNjq4c/2.gif",
            "https://i.postimg.cc/3J96XCDq/3.gif",
            "https://i.postimg.cc/PxZ9Ygmb/4.gif",
            "https://i.postimg.cc/C5s26brz/5.gif",
            "https://i.postimg.cc/28CMLX3v/6.gif",
            "https://i.postimg.cc/4xd0B76x/7.gif",
            "https://i.postimg.cc/3w0cQsbM/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le ha chocado los cinco a ${userAct}!`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
