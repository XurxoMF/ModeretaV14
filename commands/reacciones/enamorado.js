const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("enamorado").setDescription("Envia un gif in love <3"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/tC4Hv0cq/1.gif",
            "https://i.postimg.cc/VkSP1q12/2.gif",
            "https://i.postimg.cc/2jwDxj29/3.gif",
            "https://i.postimg.cc/QM1LKjFb/4.gif",
            "https://i.postimg.cc/qqjHBQNH/5.gif",
            "https://i.postimg.cc/3RTsgzpH/6.gif",
            "https://i.postimg.cc/htHWGXtv/7.gif",
            "https://i.postimg.cc/02X1LWgp/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} 😍`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
