/****************testing variables *************************/
//  const tagID = 50;
//  const pTag = 'black tea';
//  const user = 'hibow';
/***************environment variables*************************/
const sequelize = require('sequelize')
const Photos = require('../models').Photos;
require('dotenv').config();
const performance = require('perf_hooks').performance;
const db = process.env.DB_NAME;
const dataID = 9000000;
module.exports = {
  getPhotos: async (tID) => {
    //const start = new Date();
    var t0 = performance.now();
    let result;
    try{
      result = await Photos.findAll({
        where: {tagID: tID,
                id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)},
        limit: 5
      });
      let final = result.map((item) => item.dataValues);
      //console.log(final);
      var t1 = performance.now();
      console.log("getPhotos " + (t1 - t0) + " milliseconds.");
      return final;
    } catch(err){
      console.log(`ERR! ${db} query took ${(t1 - t0)}  ms`);
      console.log(err);
    }
  },
  getPhotosFromTag: async (pTag, tID) => {
    const start = new Date();
    try{
    const result = await Photos.findAll({
        where: {
          productTag: pTag,
          tagID: tID,
           id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)
            },
        limit: 5
      });
      let final = result.map((item) => item.dataValues);
      console.log(`${db} query took ${new Date() - start} ms`);
      console.log(final);
      return final;
    } catch(err){
      console.log(`ERR! ${db} query took ${new Date() - start} ms`);
      console.log(err);
    }
  },
  getPhotosFromUser: async (user) => {
    const start = new Date();
    try{
    const result = await Photos.findAll({
        where: {
          username: user,
          id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)
        },
        limit: 5
      });
      let final = result.map((item) => item.dataValues);
      console.log(`${process.env.DB_NAME} query took ${new Date() - start} ms`);
      // console.log(final);
      return final;
    } catch(err){
      console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      console.log(err);
    }
  },
  createPhotos: async (phoId, user, url, ptag, tID) => {
    const start = new Date();
    try{
    const result = await Photos.findOrCreate({
            where: {
              photoid: phoId,
              username: user,
              link: url,
              productTag: ptag,
              tagID: tID
            },
            default: {tagID: tID}
          });
      let msg = 'Done!';
      console.log(`${db} query took ${new Date() - start} ms`);
      return msg;
    } catch(err) {
      console.log(`ERR! ${db} query took ${new Date() - start} ms`);
      console.log(err);
    }
  },
  updateUser: async (user, tID) => {
    const start = new Date();
    try{
    let result = await Photos.update({
        username: user
       }, {
        where: {
           tagID: tID,
           id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)
        },
        limit: 5
        //only work for mysql
       });
      let final = result.map((item) => item.dataValues);
      console.log(final);
      let msg = 'DONE';
      await console.log(`${db} query took ${new Date() - start} ms`);
      return msg;
    } catch(err){
      console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      console.log(err);
    }
  },
    deletePhotos: async (tID) => {
    const start = new Date();
      try {
        let result = await Photos.destroy({
          where: {
          tagID: tID,
          id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)
        },
        limit: 5
        });
        console.log(result);
      let msg = `Delete!`;
      console.log(`Query took ${new Date() - start} ms`);
      return msg;
      } catch(err) {
        console.log(`Query took ${new Date() - start} ms`);
        console.log(err);
      }
  }
}
