const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('edushare', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  database: 'edushare',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

module.exports = sequelize;
