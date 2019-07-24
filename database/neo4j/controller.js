const {driver, session} = require('./index.js');
const fetch = require('node-fetch');
const key = require('../../src/unsplashAPI/unsplash.js');
const dataID = 100002;

const getIntfromObj= (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      return getIntfromObj(obj[key]);
    } else if (typeof obj[key] === 'number' && obj[key] !== 0) {
      return obj[key];
    }
  }
  return null;
}
module.exports = {
  getPhotosCounts: async (tID) => {
    console.time('getCounts');
    let result;
    const cypher = `MATCH (p:photos) WHERE p.tagID = $tagID RETURN count(*) as count`;
    try{
      result = await session.run(cypher, {tagID: tID});
      const nameRecords = result.records;
      const count = nameRecords[0].get('count');
      let final = getIntfromObj(count);
      console.log(final);
      session.close();
     console.timeEnd('getCounts');
     driver.close();
     return final;
    }catch(err) {
      console.log(err);
      console.timeEnd('getCounts');
      return `GET err!`;
    }
  },
  getPhotos: async(tID) => {
    console.time('getPhotos');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID RETURN p LIMIT 5`;
    try{
      let result = await session.run(cypher, {tagID: tID});
      let final = result.records.map((item)=> {
        let obj = item.get(0).properties;
        obj.tagID = getIntfromObj(obj);
        return obj;
      });
      console.log(final);
      session.close();
     console.timeEnd('getPhotos');
     driver.close();
     return final;
    }catch(err) {
      console.log(err);
      console.timeEnd('getPhotos');
      return `GET err!`;
    }
  },
  getPhotosFromTag: async (pTag) => {
    console.time('getPhotosFromTag');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.productTag = $productTag RETURN p LIMIT 5`;
    try{
      let result = await session.run(cypher, {productTag: pTag});
      const final = result.records.map((item)=> {
        let obj = item.get(0).properties;
        obj.tagID = getIntfromObj(obj);
        return obj;
      });
      console.log(final.length ? final: `none!`);
      session.close();
     console.timeEnd('getPhotosFromTag');
     driver.close();
     return final.length ? final: `none!`;
    }catch(err) {
      console.log(err);
      console.timeEnd('getPhotosFromTag');
      return `GET err!`;
    }
  },
  getPhotosFromUser: async (user) => {
    console.time('getPhotosFromUser');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.username = $username RETURN p LIMIT 5`;
    try{
      let result = await session.run(cypher, {username: user});
      const final = result.records.map((item)=> {
        let obj = item.get(0).properties;
        obj.tagID = getIntfromObj(obj);
        return obj;
      });
      console.log(final.length ? final: `none!`);
      session.close();
     console.timeEnd('getPhotosFromUser');
     driver.close();
     return final.length ? final: `none!`;
    }catch(err) {
      console.log(err);
      console.timeEnd('getPhotosFromUser');
      return `GET err!`;
    }
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
          const cypher = `MERGE (p:photos {photoid: '${data.results[0].id}', username: '${data.results[0].user.username}',
                          link: '${data.results[0].urls.full}', productTag: $productTag, tagID: $tagID }) RETURN p`;
          try {
            let result = await session.run(cypher,{productTag: ptag, tagID: tID});
            let final = result.records[0].get(0).properties;
            console.log(final);
            session.close();
            console.timeEnd('postPhotos');
            driver.close();
            return final;
          }catch (err) {
            console.log(err);
            console.timeEnd('postPhotos');
          }
        })
  },
  updateUser:async (user, tID) => {
    console.time('updateUser');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID AND NOT p.username = $username SET p.username = $username RETURN p LIMIT 5`;
    try{
      let result = await session.run(cypher, {tagID: tID, username: user});
      let final = [];
      for (let i = 0; i < 5; i++) {
        final.push(result.records[i].get('p').properties);
      }
      console.log(final);
      let msg = 'update done!';
      session.close();
     console.timeEnd('updateUser');
      driver.close();
      return msg;
    }catch(err) {
      console.log(err);
      console.timeEnd('updateUser');
    }
  },
  deletePhotos: async (tID) => {
    console.time('delPhotos');;
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID WITH p LIMIT 1 DETACH DELETE p`;
    try{
      result = await session.run(cypher, {tagID: tID});
      const count = result.records;
      console.log(count);
      let msg = 'delete done!'
      console.timeEnd('delPhotos');
      session.close();
      driver.close();
      return msg;
    }catch(err) {
      console.log(err);
      console.timeEnd('delPhotos');
    }
  }
}