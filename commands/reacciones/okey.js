const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("okey").setDescription("Envia un gif diciendo ok."),
    async execute(client, db, interaction) {
        const gifs = [
            "https://i.postimg.cc/Dw3RVtj4/1.gif",
            "https://i.postimg.cc/ydGrL53d/2.gif",
            "https://i.postimg.cc/Bn5kJMkY/3.gif",
            "https://i.postimg.cc/tJLw4f9f/4.gif",
            "https://i.postimg.cc/sDhbNVcR/5.gif",
            "https://i.postimg.cc/mr8nHhb7/6.gif",
            "https://i.postimg.cc/G3NZKBvQ/7.gif",
            "https://i.postimg.cc/DZ0MdFZH/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} 👍`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
