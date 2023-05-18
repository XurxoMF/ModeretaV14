const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("enfado").setDescription("Envia un gif con cara de enfado"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/j53hs7Rk/1.gif",
            "https://i.postimg.cc/bJwTcTft/2.gif",
            "https://i.postimg.cc/qvcXNYkK/3.gif",
            "https://i.postimg.cc/L61Vp5wN/4.gif",
            "https://i.postimg.cc/T2ScFg7K/5.gif",
            "https://i.postimg.cc/Z5zxKZhZ/6.gif",
            "https://i.postimg.cc/3NPCGQ4X/7.gif",
            "https://i.postimg.cc/nrsGMhzV/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ** se ha enfado!!**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
