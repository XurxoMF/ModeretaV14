const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(client, db, reaction, user) {
        //console.log(reaction._emoji.name, reaction.count);
        console.log(reaction.message.attachments);

        if (
            reaction.message.channelId === "742804647894581289" &&
            reaction.message.author.id === "646937666251915264" &&
            reaction._emoji.name === "⭐" &&
            reaction.count === 1 &&
            (reaction.message.content.includes("is dropping 3 cards!") ||
                reaction.message.content.includes(
                    "This drop has expired and the cards can no longer be grabbed."
                ))
        ) {
            const pogdrops = await client.channels.cache.get("831596499980779530");

            const pogdrop = new EmbedBuilder()
                .setDescription(reaction.message.content)
                .setImage(reaction.message.attachments[0].url)
                .setColor("#ff8800");

            pogdrops.send({ embeds: [pogdrop] });
        }
    },
};
