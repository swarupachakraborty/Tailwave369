const Sequelize = require("sequelize")

const sequelize = new Sequelize("tailwebsdb", "root", "swarupa123", {
    dialect : "mysql",
    host : "localhost"
});

module.exports = sequelize;