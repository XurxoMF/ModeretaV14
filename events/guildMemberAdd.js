const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, db, member) {
        member.roles.add([
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
