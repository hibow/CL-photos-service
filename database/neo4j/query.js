//this is for CRUD API
const {driver, session} = require('./index.js');
const dataID = 9000000;

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
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
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
  getPhotos: async (tID) => {
    console.time('getPhotos');
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
    try{
      const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID RETURN p LIMIT 5`;
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
      return final.length? final : `none!`;
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
  createPhotos: async (phoId, user, url, ptag, tID) => {
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
    console.time('postPhotos');
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
          const cypher = `MERGE (p:photos {photoid: $photoid, username: $username,
                          link: $link, productTag: $productTag, tagID: $tagID }) RETURN p`;
          try {
            let result = await session.run(cypher,{photoid: phoId, username: user, link: url, productTag: ptag, tagID: tID});
            let final = result.records[0].get(0).properties;
            console.log(final);
            session.close();
            console.timeEnd('postPhotos');
            driver.close();
            return final;
          }catch (err) {
            console.log(err);
            console.timeEnd('postPhotos');
            return `POST ERR!`;
          }
  },
  updateUser:async (user, tID) => {
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
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
      return final.length? msg: `none!`;
    }catch(err) {
      console.log(err);
      console.timeEnd('updateUser');
      return `update ERR!`;
    }
  },
  deletePhotos: async (tID) => {
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
    console.time('delPhotos');;
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID WITH p LIMIT 1 DETACH DELETE p RETURN p `;
    try{
      result = await session.run(cypher, {tagID: tID});
      const count = result.records[0].get('p').identity;
      let msg = 'delete done!'
      // console.log(typeof count === 'object' ? msg : `none!`);
      console.timeEnd('delPhotos');
      session.close();
      driver.close();
      return typeof count === 'object' ? msg : `none!`;
    }catch(err) {
      console.log(err);
      console.timeEnd('delPhotos');
      return `delete ERR!`;
    }
  }
}