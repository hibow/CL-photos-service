const db = require('./index.js').pgDB;
const fetch = require('node-fetch');
const key = require('../../src/unsplashAPI/unsplash.js');
const limit = 5;
const dataID = 100002;

module.exports = {
  db: db,
  getPhotos: (tID) => {
    console.time('getPhotos');
    const queryStr = `SELECT * FROM public."Photos" WHERE id >= ${dataID} AND "tagID" = ${tID} LIMIT ${limit};`;
      return db.query(queryStr).then((res) => {
        console.log(res.rows);
        console.timeEnd('getPhotos');
        db.end();
        return res.rows;
      }).catch(err => console.log(err));
  },
  getPhotosFromTag: (pTag, tID) => {
    const query = `SELECT * FROM public."Photos" WHERE "productTag" = '${pTag}' AND "tagID" = ${tID} LIMIT ${limit};`;
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
    },
  getPhotosCounts : (tID) => {
    console.time('getCounts');
    const queryStr = `SELECT COUNT(*) FROM public."Photos" WHERE id >= ${dataID} AND "tagID" = ${tID};`;
    return db.query(queryStr).then((res) => {
      console.log(res.rows);
      console.timeEnd('getCounts');
      db.end();
      return res.rows;
    }).catch(err => console.log(err));
  }, 
  createPhotos: (tID, ptag) => {
    fetch(
      `https://api.unsplash.com/search/photos/?query=${ptag}&client_id=${key.accessKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then(async (data) => {
        for (let k = 0; k < 5; k++) {
        const query = `INSERT INTO public."Photos" (photoid, link, username, "productTag", "tagID")
                     SELECT '${data.results[k].id}', '${data.results[k].urls.full}', '${data.results[k].user.username}', '${ptag}', '${tID}'
                     WHERE NOT EXISTS (SELECT 1 FROM public."Photos" WHERE "tagID" = ${tID});`
          try {
            let res = await db.query(query)
            console.log(res.rows);
          }catch(err) {
            console.log(err);
          }
        }
        await console.log('done');
        return;
        })
   },
  updateUser: (user, tID) => {

  },
  deletePhotos: (tID) => {

  }
}
