'use strict';

const path = require('path');
const Sequelize = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, 
    "root", 
    process.env.MYSQL_ROOT_PASSWORD, 
    {
        "host": process.env.MYSQL_HOST,
        "port": process.env.MYSQL_PORT,
        "dialect": "mysql"
    }, );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize)
db.Member = require('./member')(sequelize, Sequelize)

db.User.hasMany(db.Member)

module.exports = db;
