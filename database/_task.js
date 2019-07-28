//choose which database to run
const env = require('../config.js');
if (env.db_name === 'mysql') {
  console.log(env.db_name);
   const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./mysql/controller.js');

} else if (env.db_name === 'postgres') {
  console.log(env.db_name);
  //FOR ORM query test
// const {getPhotos, getPhotosFromTag,getPhotosFromUser,createPhotos, updateUser, deletePhotos} = require('./query.js');

  const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./postgres/query.js');
  // createPhotos(3005,'converse');
// getPhotos(9900000);
// getPhotosFromTag(9990000);
// getPhotosFromUser(9933333);
// updateUser('hibow', 9999000);
deletePhotos(900000);
} else if (env.db_name === 'neo4j') {
  console.log(env.db_name);
  const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./neo4j/query.js/index.js.js');
  // const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./neo4j/httpQuery.js');
// getPhotos(9900000);
// getPhotosFromTag(9990000)
// getPhotosFromUser(9900000)
// createPhotos(355, 'life')
// updateUser('baba', 90000)
// deletePhotos(9999999)
}


