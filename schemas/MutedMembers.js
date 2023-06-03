const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MutedMembers extends Model {}

    MutedMembers.init(
        {
            memberId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fin: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            muted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            motivo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            muteador: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "MutedMembers",
        }
    );

    return MutedMembers;
};
