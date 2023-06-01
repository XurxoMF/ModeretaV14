const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        member.roles.add([
            "864649993453174805",
            "864650641167351818",
            "726143285545926736",
            "898862006852009985",
            "864656505541623849",
            "1112837414440935454",
        ]);
    },
};
