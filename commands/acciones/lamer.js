const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    uso: " **`<usuario>`**",
    data: new SlashCommandBuilder()
        .setName("lamer")
        .setDescription("Le pegas un lametón a la persona a la que menciones.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Persona a la que lamer.").setRequired(true)
        ),
    async execute(interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Tenemos a un medio gato entre nosotros :)",
            });
        }

        const gifs = [
            "https://i.postimg.cc/1t26hdTd/1.gif",
            "https://i.postimg.cc/pdVKDzzs/3.gif",
            "https://i.postimg.cc/rphxgs9M/4.gif",
            "https://i.postimg.cc/SN8Lqymf/5.gif",
            "https://i.postimg.cc/cC33smGL/6.gif",
            "https://i.postimg.cc/g2WV2fJF/7.gif",
            "https://i.postimg.cc/G3TGJcTn/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ha lamido a ${userAct} >_<`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
