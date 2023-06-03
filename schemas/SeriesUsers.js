"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class SeriesUsers extends Model {}

    SeriesUsers.init(
        {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            serie: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "SeriesUsers",
        }
    );

    return SeriesUsers;
};
