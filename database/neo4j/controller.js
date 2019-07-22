const {driver, session} = require('./index.js');
const fetch = require('node-fetch');
const key = require('../../src/unsplashAPI/unsplash.js');
const dataID = 100002;
module.exports = {
  getPhotosCounts: async (tID) => {
    console.time('getCounts');
    let result;
    const cypher = `MATCH (p:photos) WHERE p.tagID = $tagID RETURN count(*) as count`;
    try{
      result = await session.run(cypher, {tagID: tID});
      const nameRecords = result.records;
      const count = nameRecords[0].get('count');
      console.log(count);
      session.close();
      // console.log(`took ${performance.now() - t0} ms`)
     console.timeEnd('getCounts');
     return count;
      driver.close();
    }catch(err) {
      console.log(err);
    }
  },
  getPhotos: async(tID) => {
    console.time('getPhotos');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID RETURN p LIMIT 5`;
    try{
      result = await session.run(cypher, {tagID: tID});
      const nameRecords = result.records;
      const final = result.records.map((item)=> {
        let obj = item.get(0).properties;
        if (typeof (obj.tagID.low) === 'number' && obj.tagID.low !== 0 ) {
          obj.tagID = obj.tagID.low;
        } else if (typeof (obj.tagID.high) === 'number' && obj.tagID.high !== 0) {
          obj.tagID = obj.tagID.high;
        }
        return obj;
      });
      console.log(final);
      session.close();
     console.timeEnd('getPhotos');
     return final;
      // console.log(`seeding process took ${new Date().getTime() - t0} ms`);
      driver.close();
    }catch(err) {
      console.log(err);
    }
  },
  getPhotosFromTag: (pTag, tID) => {
  
  },
  getPhotosFromUser: (user) => {
  },
  createPhotos: async (tID, ptag) => {
    console.time('postPhotos');
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
        let arr = [];
        for (let k = 0; k < 5; k++) {
         // await arr.push({photoid: data.results[k].id, username: data.results[k].user.username, link: data.results[k].urls.full, pTag: ptag, tagID: tID});
          const cypher = `MERGE (p:photos {photoid: '${data.results[k].id}', username: '${data.results[k].user.username}', link: '${data.results[k].urls.full}', productTag: $pTag, tagID: $tagID }) RETURN p`;
          try {
            let result = await session.run(cypher,{productTag: ptag, tagID: tID});
            console.log(result.records[0]);
          }catch (err) {
            console.log(err);
          }
        }
        // list = arr;
        // const cypher = `UNWIND {list} as row MERGE (p:photos {photoid: row.photoid, username: row.username, link: row.link, pTag: row.pTag, tagID: row.tagID})`;
        //   try {
        //     let result = await session.run(cypher, {list: list});
        //     console.log(result.records[0]);
        //     session.close();
        //   }catch (err) {
        //     console.log(err);
        //   }
        session.close();
          await console.timeEnd('postPhotos');
          driver.close();
        })
  },
  updateUser:async (user, tID) => {
    console.time('updateUser');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID AND NOT p.username = $username SET p.username = $username RETURN p  LIMIT 5`;
    try{
      result = await session.run(cypher, {tagID: tID, username: user});
      const nameRecords = result.records;
      const count = nameRecords[0].get(0);
      console.log(count);
      session.close();
     console.timeEnd('updateUser');
      // console.log(`seeding process took ${new Date().getTime() - t0} ms`);
      driver.close();
    }catch(err) {
      console.log(err);
    }
  },
  deletePhotos: async (tID) => {
    console.time('delPhotos');;
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID WITH p LIMIT 5 DETACH DELETE p`;
    try{
      result = await session.run(cypher, {tagID: tID});
      const nameRecords = result.records;
      const count = nameRecords[0];
      console.log(count);
      console.timeEnd('delPhotos');
      session.close();
      driver.close();
      return count;
    }catch(err) {
      console.log(err);
    }
  }
}