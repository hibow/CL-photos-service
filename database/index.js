//choose which database to run
require('dotenv').config(); 

if (process.env.DB_NAME === 'mysql') {
  console.log(process.env.DB_NAME);
 // DB = require('./mysql');
}
// } else if (process.env.DB.trim() === 'postgres') {
//   console.log(process.env.DB);
//   DB = require('./postgres');
// } else if (process.env.DB.trim() === 'mongo') {
//   console.log(process.env.DB);
//   DB = require('./mongoDb');
// }