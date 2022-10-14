const result = sequelize.define("reportSheet", {
    id: {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        unique : true,
        primaryKey : true
    },

    Name : {
        type : Sequelize.STRING,
        allowNull : false,

    },

    Subject : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    Marks : {
        type  : Sequelize.INTEGER,
        allowNull : false,

    }
}, {
    timestamps : false
});

module.exports = result;