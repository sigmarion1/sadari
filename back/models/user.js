// const { DATE } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        loginAt: {
            allowNull: true,
            type: DataTypes.DATE
          }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}