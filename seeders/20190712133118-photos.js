'use strict';
const {photoGenerator} = require('../helper/generator');
const fs = require('fs');
//seeding into a json file
//photoGenerator();
const contents = fs.readFileSync('helper/photos.js');
// Define to JSON type
const jsonContent = JSON.parse(contents);


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', jsonContent, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};
