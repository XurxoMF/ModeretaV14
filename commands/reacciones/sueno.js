const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("sueño").setDescription("Envia un gif durmiendo."),
    async execute(client, db, interaction) {
        const gifs = [
            "https://i.postimg.cc/1XvR7D1M/1.gif",
            "https://i.postimg.cc/wBNvxtDT/2.gif",
            "https://i.postimg.cc/L596VNwn/3.gif",
            "https://i.postimg.cc/mDGrPbS3/4.gif",
            "https://i.postimg.cc/vZcTj2Bn/5.gif",
            "https://i.postimg.cc/vZkTd7gN/6.gif",
            "https://i.postimg.cc/0QdymLtT/7.gif",
            "https://i.postimg.cc/qM7vhD2F/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} **se está quedando dormido!!**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
