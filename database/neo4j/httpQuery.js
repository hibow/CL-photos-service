
const fetch = require('node-fetch');
const key = require('../../src/unsplashAPI/unsplash.js');
const dataID = 10000;
const cypherReq = require('./index.js');

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
//   var query="MATCH (p:photos) WHERE id(p) >= 9000000 AND p.tagID = $tagID RETURN p LIMIT $limit"
// var params={tagID: 23, limit: 5}
// var cb=function(err,data) { console.log(JSON.stringify(data)) }

// cypher(query,params,cb)

  getPhotos: (tID) => {
    console.time('getPhotos');
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
      const cb = (err,data) => {
        let final = data.results[0].data.map((item)=> {
          let obj = item.row[0];
          return obj;
        })
        console.log(final);
        console.timeEnd('getPhotos');
      }
      const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID RETURN p LIMIT 5`;
      cypherReq(cypher, {tagID: tID},cb);
      // let final = result.records.map((item)=> {
      //   let obj = item.get(0).properties;
      //   obj.tagID = getIntfromObj(obj);
      //   return obj;
      // });
      // console.log(result);
      // session.close();

      // driver.close();
      // return final.length? final : `none!`;
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
    if (typeof tID !== 'number') {
      tID = parseInt(tID);
    }
    console.time('updateUser');
    const cypher = `MATCH (p:photos) WHERE id(p) >= ${dataID} AND p.tagID = $tagID AND NOT p.username = $username SET p.username = $username RETURN p LIMIT 5`;
    try{
      let result = await session.run(cypher, {tagID: tID, username: user});
      let final = result.records.map((item)=> {
        let obj = item.get('p').properties;
        obj.tagID = getIntfromObj(obj);
        return obj;
      });
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
      console.log(getIntfromObj(count));
      let msg = 'delete done!'
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