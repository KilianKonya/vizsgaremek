const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            freezeTableName: true,
            underscored: true,
            timestamps: false
    }
    }
   
);

module.exports = sequelize;