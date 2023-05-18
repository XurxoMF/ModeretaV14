const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("llanto").setDescription("Envia un gif llorando"),
    async execute(interaction) {
        const gifs = [
            "https://i.postimg.cc/qqnQj7db/1.gif",
            "https://i.postimg.cc/QNW6XfWQ/2.gif",
            "https://i.postimg.cc/8zTwmDX4/3.gif",
            "https://i.postimg.cc/mDK8YHK1/4.gif",
            "https://i.postimg.cc/vHF0D5Wp/5.gif",
            "https://i.postimg.cc/bNx3ndgd/6.gif",
            "https://i.postimg.cc/wv1wRV4d/7.gif",
            "https://i.postimg.cc/rpFnMcSs/8.gif",
        ];
        const userSend = interaction.member || interaction.user;
        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend}  **está llorando ;-;**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({ embeds: [embed] });
    },
};
