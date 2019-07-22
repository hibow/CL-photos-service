const db = require('./index.js').pgDB;
const videoCount = 10;

module.exports = {
  db: db,
  getPhotos: (tID) => {
    const queryStr = `SELECT * FROM public."Photos" WHERE "tagID" = ${tID} LIMIT ${videoCount};`;
      return db.query(queryStr).then((res) => {
        return res.rows;
      }).catch(err => console.log(err));
  },
  getPhotosFromTag: (pTag, tID) => {
    const query = `SELECT * FROM public."Photos" WHERE "productTag" = '${pTag}' AND "tagID" = ${tID} LIMIT ${videoCount};`;
      return db.query(query).then((res) => {
        return res.rows;
      }).catch(err => console.log(err));
  },
  getPhotosFromUser: (user) => {
    const query = `SELECT * FROM public."Photos" WHERE "username" = '${user}';`;
    return db.query(query).then((res) => {
      return res.rows;
    }).catch(err => console.log(err));
  },
  insertIntoDB: (photoid, username, link, productTag, tagID) => {
    const sql = `INSERT INTO public."Photos" (photoid, link, username, productTag, tagID)
                   VALUES ('${photoid}', '${link}', '${username}', '${productTag}', '${tagID}')`;
      return db.query(query).then((res) => {
        return res.rows;
      }).catch(err => console.log(err));
    }
}