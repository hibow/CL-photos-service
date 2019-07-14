/****************testing variables *************************/
 const tagID = '123'; 
 const pTag = 'Wine';
 const user = 'hibow';
/***************environment variables*************************/
const Photos = require('../models').Photos;
require('dotenv').config(); 


  const getPhotos = async (tID) => {
    const start = new Date();
    try{
    const result = await Photos.findAll({
        where: {tagID: tID}
      });
      await console.log( `${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(result.length);
      //return result;
    } catch(err){
      await console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(err);
    }
    await console.log(`${process.env.DB_NAME} END: query took ${new Date() - start} ms`);
    return;
  }

  const getPhotosFromTag = async (pTag, tID) => {
    const start = new Date();
    try{
    const result = await Photos.findAll({
        where: {
          productTag: pTag,
          tagID: tID
        }
      });
      await console.log(`${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(result.length);
      //return result;
    } catch(err){
      await console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(err);
    }
    return await console.log(`${process.env.DB_NAME} END: query took ${new Date() - start} ms`);
  }
  
  const getPhotosFromUser = async (user) => {
    const start = new Date();
    try{
    const result = await Photos.findAll({
        where: {
          username: user
        }
      });
      await console.log(`${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(result.length);
      //return result;
    } catch(err){
      await console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(err);
    }
    return await console.log(`${process.env.DB_NAME} END: query took ${new Date() - start} ms`);
  } 

  const updateUser = async (user, tID) => {
    const start = new Date();
    try{
    const result = await Photos.update({
        username: user
       }, {
         where: {
           tagID: tID
         }
       });
      await console.log(`${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(result.length);
      //return result;
    } catch(err){
      await console.log(`ERR! ${process.env.DB_NAME} query took ${new Date() - start} ms`);
      await console.log(err);
    }
    return await console.log(`${process.env.DB_NAME} END: query took ${new Date() - start} ms`);
  }
  



  getPhotos(tagID)

  //getPhotosFromTag(pTag, tagID);

  //getPhotosFromUser(user);

 //updateUser(user, tagID);