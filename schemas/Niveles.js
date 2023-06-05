const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Niveles extends Model {}

    Niveles.init(
        {
            userId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            xp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            nivel: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "Niveles",
        }
    );

    return Niveles;
};
