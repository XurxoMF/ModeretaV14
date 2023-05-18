const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("ehe").setDescription("Envía un gif con cara ehe ;P"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/vHf5KjxK/1.gif",
            "https://i.postimg.cc/9QBZm7pt/2.gif",
            "https://i.postimg.cc/SsPKQy3G/3.gif",
            "https://i.postimg.cc/RZmwxRcZ/4.gif",
            "https://i.postimg.cc/1tXtZgCt/5.gif",
            "https://i.postimg.cc/RhnZNkzx/6.gif",
            "https://i.postimg.cc/44rzBZyt/7.gif",
            "https://i.postimg.cc/dQ722Dsw/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ** ;P**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
