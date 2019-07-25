//choose which database to run
const env = require('../config.js');
if (env.db_name === 'mysql') {
  console.log(env.db_name);
   const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./mysql/controller.js');

} else if (env.db_name === 'postgres') {
  console.log(env.db_name);
  //FOR ORM query test
// const {getPhotos, getPhotosFromTag,getPhotosFromUser,createPhotos, updateUser, deletePhotos} = require('./query.js');

  const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./postgres/controller.js');
  // createPhotos(3005,'converse');
getPhotos(10);
// getPhotosFromTag('pot');
// getPhotosFromUser('beccatapert');
// updateUser('hibow', 10);
// deletePhotos(10);
} else if (env.db_name === 'neo4j') {
  console.log(env.db_name);
  const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./neo4j/controller.js');
deletePhotos(10);
}


