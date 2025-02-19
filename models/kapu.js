const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kapu = sequelize.define('Kapu', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    epuletbejarat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'kapu',
});

module.exports = Kapu;
