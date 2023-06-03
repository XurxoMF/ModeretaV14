const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PingCount extends Model {}

    PingCount.init(
        {
            userId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            usos: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "PingCount",
        }
    );

    return PingCount;
};
