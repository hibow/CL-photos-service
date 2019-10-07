const db = require('./index.js').pgDB;
const fetch = require('node-fetch');
const key = require('../../src/unsplashAPI/unsplash.js');
const limit = 5;
const dataID = 9000000;

module.exports = {
  getPhotos: (tID) => {
    console.time('getPhotos');
    const queryStr = `SELECT * FROM public."Photos"
                    WHERE "tagID" = (SELECT "tagID" FROM public."Photos" WHERE id = ${tID}) LIMIT 5`;
    // const queryStr = `SELECT * FROM public."Photos" WHERE id >= ${dataID} AND "tagID" = ${tID} LIMIT ${limit};`;
      return db.query(queryStr).then((res) => {
        console.log(res.rows);
        console.timeEnd('getPhotos');
        // db.end(); //need to close for api test
        return res.rows;
      }).catch(err => console.log(err));
  },
  getPhotosFromTag: (tID) => {
    console.time('getPhotosTag');
    const query = `SELECT * FROM public."Photos"
    WHERE "productTag" = (SELECT "productTag" FROM public."Photos" WHERE id = ${tID}) LIMIT 5`;
    // const query = `SELECT * FROM public."Photos" WHERE id >= ${dataID} AND "productTag" = '${pTag}' LIMIT ${limit};`;
      return db.query(query).then((res) => {
        console.log(res.rows);
        console.timeEnd('getPhotosTag');
        db.end();
        return res.rows;
      }).catch(err => console.log(err));
  },
  getPhotosFromUser: (tID) => {
    console.time('getPhotosUser');
    const query = `SELECT * FROM public."Photos"
    WHERE "username" = (SELECT "username" FROM public."Photos" WHERE id = ${tID}) LIMIT 5`;
    // const query = `SELECT * FROM public."Photos" WHERE id >= ${dataID} AND "username" = '${user}' LIMIT ${limit};`;
    return db.query(query).then((res) => {
      console.log(res.rows);
      console.timeEnd('getPhotosUser');
      db.end();
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
  createPhotos: async (phoId, user, url, ptag, tID) => {

    // fetch(
    //   `https://api.unsplash.com/search/photos/?query=${ptag}&client_id=${key.accessKey}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // )
    //   .then((response) => response.json())
    //   .then(async (data) => {
          console.time('createPhotos');
        const query = `INSERT INTO public."Photos" (photoid, link, username, "productTag", "tagID")
                    VALUES ('${phoId}', '${user}', '${url}', '${ptag}', '${tID}');`;
          try {
            let res = await db.query(query)
            console.log(res.rowCount);
            console.timeEnd('createPhotos');
            // db.end();
            return res.rowCount? res.rowCount:`none!`;
          }catch(err) {
            console.log(err);
            console.timeEnd('createPhotos');
            return `create ERR!`;
          }
        // })
   },
  updateUser: (user, tID) => {
    console.time('updateUser');
    const queryStr = `UPDATE public."Photos" SET username = '${user}'
               WHERE id IN (SELECT id FROM public."Photos"
               WHERE "tagID" = (SELECT "tagID" FROM public."Photos" WHERE id = ${tID}) LIMIT 5)`;
    // const queryStr = `UPDATE public."Photos" SET username = '${user}' WHERE id IN (
    //   SELECT id FROM public."Photos" WHERE id >= ${dataID} AND "tagID" = ${tID} LIMIT 5)`;
    return db.query(queryStr).then((res) => {
      console.log(res.rowCount);
      console.timeEnd('updateUser');
      // db.end();
      return res.rowCount? res.rowCount : `none!`;
    }).catch(err => console.log(err));
  },
  deletePhotos: (tID) => {
    console.time('deletePhotos');
    const queryStr = `DELETE FROM public."Photos" WHERE id = ${tID}`;
    // const queryStr = `DELETE FROM public."Photos" WHERE id IN (
    //   SELECT id FROM public."Photos" WHERE id >= ${dataID} AND "tagID" = ${tID} LIMIT 1)`;
    return db.query(queryStr).then((res) => {
      console.log(res.rowCount);
      console.timeEnd('deletePhotos');
      // db.end();
      return res.rowCount? res.rowCount : 'none!';
    }).catch(err => console.log(err));
  }
}
