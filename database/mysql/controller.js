const db = require('./index.js').mysqlDB;
const videoCount = 10;

module.exports = {
  db: db,
  getPhotos: (tID) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT * FROM photos WHERE photos.tagID = (?) LIMIT ${videoCount}`;
      db.query(query, [tID], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    })
  },
  getPhotosFromTag: (pTag, tID) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT * FROM photos WHERE photos.productTag = (?) AND photos.tagID = (?)`;
      db.query(query, [pTag, tID], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    })
  },
  getPhotosFromUser: (user) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT * FROM photos WHERE photos.username = (?)`;
      db.query(query, [user], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    })
  },
  insertIntoDB: (photoid, username, link, productTag, tagID) => {
    return new Promise ((resolve, reject) => {
      const sql = `INSERT INTO photos (photoid, link, username, productTag, tagID)
                   VALUES ('${photoid}', '${link}', '${username}', '${productTag}', '${tagID}')`;
      connection.query(sql, (err, row) => {
        if (err) {
          return reject(err);
      } 
      resolve(row);
      });
    }
  )}
}
