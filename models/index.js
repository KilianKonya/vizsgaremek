const sequelize = require('../config/database');
const Szemely = require('./szemely');
const Kapu = require('./kapu');
const Athaladas = require('./athaladas');

// Asszociációk
Szemely.hasMany(Athaladas, { foreignKey: 'szemelyid', onDelete: 'CASCADE' });
Athaladas.belongsTo(Szemely, { foreignKey: 'szemelyid', onDelete: 'CASCADE' });

Kapu.hasMany(Athaladas, { foreignKey: 'kapuid', onDelete: 'CASCADE' });
Athaladas.belongsTo(Kapu, { foreignKey: 'kapuid', onDelete: 'CASCADE' });

module.exports = { sequelize, Szemely, Kapu, Athaladas };
