//for all the secrets
require("dotenv").config();
const secrets = require("./secrets.js");
module.exports = {
  db: process.env.neo4j_name,
  db_name: process.env.DB_DATABASE,
  db_username: process.env.neo4j_username,
  db_pwd: process.env.neo4j_pw,
  db_host: process.env.DB_HOST,
  db_port: process.env.PORT
};
