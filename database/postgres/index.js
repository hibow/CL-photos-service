const Pool = require("pg-pool");
require("dotenv").config(); //no err if no .env

//first, createdb dbname
//default pg confg in env

// const pgDB = new Pool({
//   // ssl: true,
//   max: 20, // set pool max size to 20
//   idleTimeoutMillis: 30000, // close idle clients after 1 second
//   connectionTimeoutMillis: 2000 // return an error after 1 second if connection could not be established
// });

// pgDB.on("connect", () => {
//   console.log("connected!");
// });
const pgDB = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const createTables = async () => {
  const createPhotos = `CREATE TABLE IF NOT EXISTS
    photos(
      id SERIAL PRIMARY KEY,
      photoid TEXT NOT NULL,
      link TEXT NOT NULL,
      username TEXT NOT NULL,
      productTag TEXT NOT NULL,
      tagID INT NOT NULL,
      createdAt TIMESTAMPTZ
    )`;

  try {
    const res = await pgDB.query(createPhotos);
    console.log(res);
    pgDB.end();
  } catch (err) {
    console.log(err);
    pgDB.end();
  }
};
// pgDB.on("remove", () => {
//   console.log("client removed");
//   process.exit(0);
// });

module.exports = {
  createTables,
  pgDB
};
