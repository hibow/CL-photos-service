//choose which database to run
require('dotenv').config(); 
const performance = require('perf_hooks').performance;
if (process.env.DB_NAME === 'mysql') {
  console.log(process.env.DB_NAME);
   const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./mysql/controller.js')
  //  var t0 = performance.now();
  //  getPhotos(50).then((data) => {
  //    console.log(data.length)
  //    var t1 = performance.now();
  //    console.log("Call to seed took " + (t1 - t0) + " milliseconds.");
  //    db.end();
  //  })
// .catch(err => console.log(err));
} else if (process.env.DB_NAME === 'postgres') {
  console.log(process.env.DB_NAME);
  const {db, getPhotos, getPhotosFromTag, getPhotosFromUser} = require('./postgres/controller.js');
  // var t0 = performance.now();
  // getPhotos(50).then((data) => {
  //   console.log(data.length)
  //   var t1 = performance.now();
  //   console.log("Call to seed took " + (t1 - t0) + " milliseconds.");
  //   db.end();
  // })
  // .catch(err => console.log(err));
} 


