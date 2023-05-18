const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("risa").setDescription("Envia un gif riéndose"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/m2WGRzhr/1.gif",
            "https://i.postimg.cc/7Zx8GF38/2.gif",
            "https://i.postimg.cc/CMqVWHht/3.gif",
            "https://i.postimg.cc/jd6YjxJ4/4.gif",
            "https://i.postimg.cc/vZ3RW0h1/5.gif",
            "https://i.postimg.cc/MGFhLXhq/6.gif",
            "https://i.postimg.cc/3wRs92ft/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} **se parte de risa!!**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
