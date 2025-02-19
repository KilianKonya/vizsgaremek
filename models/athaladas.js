const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Athaladas = sequelize.define('Athaladas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    szemelyid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kapuid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idopont: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    irany: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'athaladas',
});

module.exports = Athaladas;