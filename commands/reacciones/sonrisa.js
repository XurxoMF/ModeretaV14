const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("sonrisa").setDescription("Envia un gif sonriendo."),
    async execute(client, db, interaction) {
        const gifs = [
            "https://i.postimg.cc/L6jg61TQ/1.gif",
            "https://i.postimg.cc/T39ynvBr/2.gif",
            "https://i.postimg.cc/RF84wgM1/3.gif",
            "https://i.postimg.cc/HxjTJqCs/4.gif",
            "https://i.postimg.cc/MZMjN4jS/5.gif",
            "https://i.postimg.cc/x8zY5LCw/6.gif",
            "https://i.postimg.cc/zG5bLG2z/7.gif",
            "https://i.postimg.cc/xqVQ4qNc/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} **está mostrando su mejor sonrisa**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
