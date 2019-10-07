"use strict";
//const {photoGenerator} = require('../helper/generator');
const fs = require("fs");
const contents = fs.readFileSync("helper/photos.js");
const jsonContent = JSON.parse(contents);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let insertData = [];
    const totaltimes = 1;
    const totalbatch = 10000;
    for (let i = 0; i < totaltimes; i++) {
      jsonContent.forEach(item => {
        insertData.push(item);
      });
    }
    try {
      for (let j = 0; j < totalbatch; j++) {
        await queryInterface.bulkInsert("Photos", insertData, {});
      }
    } catch {
      await console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Photos", null, {});
  }
};
