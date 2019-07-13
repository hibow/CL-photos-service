'use strict';
const {photoGenerator} = require('../helper/generator');
const fs = require('fs');
const performance = require('perf_hooks').performance;
//seeding into a json file
// photoGenerator();
const contents = fs.readFileSync('helper/photos.js');
// Define to JSON type
const jsonContent = JSON.parse(contents);
let insertData = [];
const totaltimes = 10000;
for (let i = 0; i < totaltimes; i++) {
  jsonContent.forEach(item => {
    insertData.push(item);
  })  
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', insertData, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};
