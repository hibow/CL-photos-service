'use strict';

module.exports = {
  generateRandomID,
  generateRandomPostinfo,
  generateRandomUser
};
const faker = require('faker');

function generateRandomID(context, events, done){ //has to use 'function'
  const pid = faker.random.number({min:9000000, max:10200000});
  context.vars.id = pid;
  return done();
};
function generateRandomPostinfo(context, events, done) {
  const tID = faker.random.number({min:300, max:2000});
  const pTag = faker.commerce.product();
  context.vars.tid = tID;
  context.vars.ptag = pTag;
  return done();
}
function generateRandomUser(context, events, done) {
  const username = faker.name.firstName();
  const pid = faker.random.number({min:9000000, max:10200000});
  context.vars.id = pid;
  context.vars.user = username;
  return done();
}