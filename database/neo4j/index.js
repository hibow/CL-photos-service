const neo4j = require('neo4j-driver').v1;
const env = require('../../config.js');


const driver = neo4j.driver(env.db_host, neo4j.auth.basic(env.db_username, env.db_pwd));
//Driver instance should be closed when Node.js application exits:
//driver.close();

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!
const session = driver.session();

///////////HTTP endpoint////////////
// var r=require("request");
// const env = require('../../config.js');
// const basicAuth = 'Basic bmVvNGo6cm9vdHJvb3Q';
// var txUrl = "http://localhost:7474/db/data/transaction/commit";


// const cypherReq = (query,params,cb) => {
//   r.post({uri:txUrl,
//           json:{statements:[{statement:query,parameters:params}]},
//           headers: {
//             Authorization: basicAuth,
//           }},
//          function(err,res) { cb(err,res.body)});
// }

// module.exports = cypherReq;



module.exports = {
  session,
  driver
};