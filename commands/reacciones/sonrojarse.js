const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("sonrojarse").setDescription("Envia un gif sonrojándose"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/PfP7CmP4/1.gif",
            "https://i.postimg.cc/T3q7z04R/2.gif",
            "https://i.postimg.cc/vBD06sHB/3.gif",
            "https://i.postimg.cc/T3GQJmYB/4.gif",
            "https://i.postimg.cc/wxZGL7Nd/5.gif",
            "https://i.postimg.cc/6pNbbgzj/6.gif",
            "https://i.postimg.cc/VNK766wp/7.gif",
            "https://i.postimg.cc/wTNbVg5R/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} **se ha sonrojado**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
