const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
    dialect: "sqlite",
    storage: "./db/modereta.sqlite",
    logging: false,
});
