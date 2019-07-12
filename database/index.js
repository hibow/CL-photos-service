const env = require('../config.js');
const Sequelize = require('sequelize');
// const mysql = require('mysql');
// var connection = mysql.createConnection({
//   user: env.db_username,
//   password: env.db_pwd
// });

const sequelize = new Sequelize(env.db, env.db_username, env.db_pwd, {
  host: env.db_host,
  dialect: env.db_dialect
});

const db = {
  Photos: sequelize.import('./photos.js'),
};

Object.keys(db).forEach((modelName)=> {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});



// connection.query('CREATE DATABASE IF NOT EXISTS ' + env.db, (error, data)=> {
//   if (error) {
//     console.log("Failing at database creation", error);
//   } else {
//     if (data.warningCount == 0) {
//       sequelize.sync();
//     }
//   }
// });

module.exports.sequelize = sequelize;
module.exports.db = db;
