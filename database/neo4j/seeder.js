//import session
const {driver, session} = require('./index.js');
//import json file 
const nodelabel = 'photos';
const totalBatch = 10000;
//create node
//node label Photos

//import json file by apoc.load.json
//store photos.js in neo4j desktop import folder
const seedingStart = new Date();
let cypher = `CALL apoc.load.json('photos.js') YIELD value AS photo CREATE (p:${nodelabel} {photoid: photo.photoid, username: photo.username, link: photo.link, productTag: photo.productTag, tagID: photo.tagID}) RETURN p`;

const seedNeo4j = async () => {
  // const resultPromise = session.run(cypher);
  try {
    let count = 0;
    let result;
    for (let i = 0; i < totalBatch; i++) {
      result = await session.run(cypher);
      count++;
    }
    session.close();
    //console.log(result);
    console.log(`seeding process took ${new Date() - seedingStart} ms and count: ${count*1075} nodes`);
    driver.close();
  }catch (err) {
    console.log(err);
  }
}

seedNeo4j();