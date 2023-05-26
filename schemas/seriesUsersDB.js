const { DataTypes } = require("sequelize");
const db = require("../sequelize");

const SeriesUsersDB = db.define("SeriesUsers", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = SeriesUsersDB;
