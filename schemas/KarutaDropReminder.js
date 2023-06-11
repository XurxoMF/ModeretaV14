const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class KarutaDropReminder extends Model {}

    KarutaDropReminder.init(
        {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "KarutaDropReminder",
        }
    );

    return KarutaDropReminder;
};
