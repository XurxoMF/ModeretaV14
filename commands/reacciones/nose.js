const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nosé")
        .setDescription("Envia un gif encogiéndose de hombros."),
    async execute(client, db, interaction) {
        const gifs = [
            "https://i.postimg.cc/SKMXXYLv/1.gif",
            "https://i.postimg.cc/6pS25fZZ/2.gif",
            "https://i.postimg.cc/xTfbsCYX/3.gif",
            "https://i.postimg.cc/ZnT0DfGG/4.gif",
            "https://i.postimg.cc/NMvKRGpf/5.gif",
            "https://i.postimg.cc/HW4y45GG/6.gif",
            "https://i.postimg.cc/3xW0Tck7/7.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} **se encoge de hombros**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
