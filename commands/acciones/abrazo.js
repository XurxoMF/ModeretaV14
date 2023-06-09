const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("abrazo")
        .setDescription("Le das un abrazo a la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario al que abrazar.").setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        const gifs = [
            "https://i.postimg.cc/PrpPmNBm/1.gif",
            "https://i.postimg.cc/vTp8PLp5/2.gif",
            "https://i.postimg.cc/76ZLbL3J/3.gif",
            "https://i.postimg.cc/PfcqrTPN/4.gif",
            "https://i.postimg.cc/hjZtmqsy/5.gif",
            "https://i.postimg.cc/L8j5bw45/6.gif",
            "https://i.postimg.cc/C5ZLH66F/7.gif",
            "https://i.postimg.cc/BQrtN40R/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} le ha dado un abrazo a ${userAct} >_<`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
