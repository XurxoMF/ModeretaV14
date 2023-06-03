const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    uso: " `<usuario>`",
    data: new SlashCommandBuilder()
        .setName("morder")
        .setDescription("Le pegas un mordisco a la persona que menciones.")
        .addMentionableOption((mention) =>
            mention.setName("usuario").setDescription("Usuario al morderás.").setRequired(true)
        ),
    async execute(client, db, interaction) {
        const userAct = interaction.options.getMentionable("usuario");
        const userSend = interaction.member;

        if (userSend.id === userAct.id) {
            interaction.reply({
                content: "Te va a doler si te muerdes a ti mismo así que no te lo recomiendo.",
            });
        }

        const gifs = [
            "https://i.postimg.cc/63XqrNkt/1.gif",
            "https://i.postimg.cc/wBJ3RBbw/2.gif",
            "https://i.postimg.cc/52D6tzpH/3.gif",
            "https://i.postimg.cc/J46s9vk5/4.gif",
            "https://i.postimg.cc/FHYYmpb5/6.gif",
            "https://i.postimg.cc/4dQdwSGt/7.gif",
            "https://i.postimg.cc/HnWLN9WN/8.gif",
        ];

        const embed = new EmbedBuilder()
            .setColor("#a30584")
            .setDescription(`${userSend} ha mordido a ${userAct} y le ha dejado marca!`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

        interaction.reply({
            embeds: [embed],
        });
    },
};
