const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, db, member) {
        const id = member.id;
        const avatar = member.avatarURL;

        const bienvenida = new EmbedBuilder()
            .setTitle("BIENVENID@ A ASTRO VAPORWAVE")
            .setDescription(
                `<@${id}> te damos la bienvenida a Astro Munidad. 
                \nPuedes personalizar tus roles en <id:customize> y ocultar y mostrar canales a tu gusto en <id:browse>`
            )
            .setThumbnail(avatar)
            .setImage("https://i.postimg.cc/Bb11vF6q/fondo-saludo.gif");

        await client.channels.cache.get("726150826778689566").send({
            embeds: [bienvenida],
        });

        await member.roles.add([
            "864649993453174805",
            "864650641167351818",
            "726143285545926736",
            "898862006852009985",
            "864656505541623849",
            "1112837414440935454",
        ]);

        // Añadir rol muted si o usuario está muteado
        const muted = await db.MutedMembers.findOne({
            where: { memberId: member.id, muted: true },
        });
        if (muted !== null) {
            member.roles.add("1111054758350962758");
        }
    },
};
