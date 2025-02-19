const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Szemely = sequelize.define('Szemely', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nev: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    azonosito: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jelszo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statusz: {
        type: DataTypes.STRING,
        defaultValue: 'aktív',
    },
    osztaly: {
        type: DataTypes.STRING,
        defaultValue: 'általános',
    },
    idopont: {
        type: DataTypes.TIME,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'szemely',
});

module.exports = Szemely;

