const { Events, EmbedBuilder, Collection } = require("discord.js");

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(client, db, reaction, user) {
        if (
            (reaction.message.channelId === "742804647894581289" &&
                reaction.message.author.id === "646937666251915264" &&
                reaction._emoji.name === "⭐" &&
                reaction.count === 1 &&
                (reaction.message.content.includes("is dropping 3 cards!") ||
                    reaction.message.content.includes(
                        "This drop has expired and the cards can no longer be grabbed."
                    ))) ||
            reaction.message.content.includes("I'm dropping 3 cards")
        ) {
            const pogdrops = await client.channels.cache.get("831596499980779530");

            const pogdrop = new EmbedBuilder()
                .setTitle("Ir al drop!")
                .setURL(
                    client.guilds.cache
                        .get(reaction.message.guildId)
                        .channels.cache.get(reaction.message.channelId)
                        .messages.cache.get(reaction.message.id).url
                )
                .setDescription(reaction.message.content)
                .setImage(reaction.message.attachments.first().url)
                .setColor("#ff8800");

            pogdrops.send({ embeds: [pogdrop] });
        }
    },
};
