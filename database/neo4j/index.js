const neo4j = require('neo4j-driver').v1;
const env = require('../../config.js');


const driver = neo4j.driver(env.db_host, neo4j.auth.basic(env.db_username, env.db_pwd));
//Driver instance should be closed when Node.js application exits:
//driver.close();

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!
const session = driver.session();


// const personName = 'Alice';
// const resultPromise = session.run(
//   'CREATE (a:Person {name: $name}) RETURN a',
//   {name: personName}
// );

// resultPromise.then(result => {
//   session.close();

//   const singleRecord = result.records[0];
//   const node = singleRecord.get(0);

//   console.log(node.properties.name);

//   // on application exit:
//   driver.close();
// });

module.exports = {
  session,
  driver
};