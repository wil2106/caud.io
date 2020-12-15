const config = require('./config');

const Sequelize = require('sequelize');
let sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
    host: config.dbHost,
    dialect: 'postgres',
    logging: false
});


module.exports = sequelize;