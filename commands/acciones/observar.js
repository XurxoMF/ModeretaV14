const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("observar")
        .setDescription("Miras fijamente a la persona a la que mencionas.")
        .addMentionableOption((mention) =>
            mention
                .setName("usuario")
                .setDescription("Usuario al que te quedarás mirando fijamente.")
                .setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        const gifs = [
            "https://i.postimg.cc/6Qwxz5pj/1.gif",
            "https://i.postimg.cc/ZKGSBLth/2.gif",
            "https://i.postimg.cc/HL2DNDJp/3.gif",
            "https://i.postimg.cc/8PJGz0YH/4.gif",
            "https://i.postimg.cc/Gmv1ksdT/5.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} está viendo fijamente a ${userAct}.`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
