const roles = {
    10: ["1118870108694122549"],
    25: ["745202999965515847"],
    50: ["745203063513677855"],
    75: ["830581376817954836"],
    100: ["830581589682815057"],
};

module.exports = xp = {
    subirXp,
    randomXp,
    xpNecesaria,
    asignarRoles,
    roles,
};

async function subirXp(client, db, message) {
    let xpPlus = randomXp();

    try {
        const [user, novo] = await db.Niveles.findOrCreate({
            where: { userId: message.author.id },
            defaults: { xp: 0, nivel: 0 },
        });

        let nuevaXp = (user.xp += xpPlus);

        if (nuevaXp >= xpNecesaria(user.nivel)) {
            const nuevoUser = await user.update({
                xp: 0,
                nivel: user.nivel + 1,
            });

            try {
                asignarRoles(message.member, nuevoUser.nivel, false);
            } catch (err) {
                console.log(
                    `[ERROR] Non se puido asignar o rol de nivel ${nuevoUser.nivel} a ${message.author.id}! Log: ${err}`
                );
            }

            client.channels.cache.get("741608890533412875").send({
                content: `<@${message.author.id}> ya eres nivel **${nuevoUser.nivel}**! Enhorabuena!`,
            });
        } else {
            await user.update({ xp: nuevaXp }, { where: { userId: message.author.id } });
        }
    } catch (err) {
        console.log("[ERROR] Non se puido gardar o nivel dun usuario! Log: " + err);
    }
}

function randomXp() {
    let min = 10,
        max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function xpNecesaria(nivel) {
    return nivel === 0 ? 1 : 90 * nivel;
}

async function asignarRoles(member, nivel, force) {
    if (!force) {
        if (roles[nivel] && roles[nivel].length > 0) await member.roles.add(...roles[nivel]);
        return { asignados: roles[nivel], quitados: [] };
    } else {
        let add = [],
            remove = [];
        for (const lvl in roles) {
            if (lvl <= nivel) {
                for (const rol of roles[lvl]) {
                    if (member.roles.cache.find((v, k) => k === rol) === undefined) {
                        add.push(rol);
                    }
                }
            } else {
                for (const rol of roles[lvl]) {
                    if (member.roles.cache.find((v, k) => k === rol) !== undefined) {
                        remove.push(rol);
                    }
                }
            }
        }
        if (add.length > 0) await member.roles.add(add);
        if (remove.length > 0) await member.roles.remove(remove);

        return { asignados: add, quitados: remove };
    }
}
