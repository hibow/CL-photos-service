const sequelize = require('sequelize');
const db = require('../models/index.js');
const Photos = require('../models').Photos;
require('dotenv').config();

const dataID = 9000000;
module.exports = {
  getPhotos: async (tID) => {
    console.time('getPhotos');
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
      console.log(final);
      console.timeEnd('getPhotos');
      db.sequelize.close();
      return final;
    } catch(err){
      console.timeEnd('getPhotos');
      console.log(err);
      return 'GET ERR!';
    }
  },
  getPhotosFromTag: async (pTag, tID) => {
    console.time('getPhotosTag');
    try{
    const result = await Photos.findAll({
        where: {
          productTag: pTag,
           id: sequelize.where(
            sequelize.literal('id'),
            '>',
            dataID)
            },
        limit: 5
      });
      let final = result.map((item) => item.dataValues);
      console.log(final);
      console.timeEnd('getPhotosTag');
      db.sequelize.close();
      return final;
    } catch(err){
      console.timeEnd('getPhotosTag');
      console.log(err);
      return `GET FROMTAG ERR!`;
    }
  },
  getPhotosFromUser: async (user) => {
    console.time('getPhotosUser');
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
      console.log(final);
      console.timeEnd('getPhotosUser');
      return final;
    } catch(err){
      console.timeEnd('getPhotosUser');
      console.log(err);
    }
  },
  createPhotos: async (phoId, user, url, ptag, tID) => {
    console.timeEnd('postPhotos');
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
      console.timeEnd('postPhotos');
      return msg;
    } catch(err) {
      console.timeEnd('postPhotos');
      console.log(err);
    }
  },
  updateUser: async (user, tID) => {
    console.time('updateUser');
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
      console.timeEnd('updateUser');
      return msg;
    } catch(err){
      console.timeEnd('updateUser');
      console.log(err);
    }
  },
    deletePhotos: async (tID) => {
    console.time('deletePhotos');
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
      console.timeEnd('deletePhotos');
      return msg;
      } catch(err) {
        console.timeEnd('deletePhotos');
        console.log(err);
      }
  }
}
