const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, db, member) {
        const id = member.id;
        const avatar = member.displayAvatarURL();

        const bienvenida = new EmbedBuilder()
            .setTitle("BIENVENID@ A ASTRO VAPORWAVE")
            .setDescription(
                `<@${id}> te damos la bienvenida a Astro Munidad. 
                \nPuedes personalizar tus roles en <id:customize> y ocultar y mostrar canales a tu gusto en <id:browse>`
            )
            .setThumbnail(avatar)
            .setImage("https://i.postimg.cc/Bb11vF6q/fondo-saludo.gif")
            .setColor("#ff00ff");

        await client.channels.cache.get("726150826778689566").send({
            embeds: [bienvenida],
        });

        await member.roles.add(["726143285545926736"]);
    },
};
