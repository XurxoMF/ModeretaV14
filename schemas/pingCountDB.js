const { DataTypes } = require("sequelize");
const db = require("../sequelize");

const PingCountDB = db.define("PingCount", {
    userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    usos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = PingCountDB;
