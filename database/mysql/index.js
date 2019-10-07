const mysql = require('mysql');
require('dotenv').config(); 

const mysqlDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});


mysqlDB.connect((err) => {
  if (err) {
    console.log(`connecting to database msql error: ${err}`);
  } else {
    console.log('connected to msql database');
  }
});


module.exports = {
  mysqlDB,
};