//choose which database to run
const env = require('../config.js');
if (env.db_name === 'mysql') {
  console.log(env.db_name);
   const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./mysql/controller.js')
} else if (env.db_name === 'postgres') {
  console.log(env.db_name);
  const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./postgres/controller.js');
} else if (env.db_name === 'neo4j') {
  console.log(env.db_name);
}


