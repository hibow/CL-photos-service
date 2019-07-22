const models = require('../models/index.js');
const fetch = require('node-fetch');
const Photos = require('../models').Photos;
const key = require('../src/unsplashAPI/unsplash.js');

module.exports = {
  post: (req, res) => {
    const ptag = req.params.ptag;
    const pid = req.params.id;
    fetch(
      `https://api.unsplash.com/search/photos/?query=${ptag}&client_id=${key.accessKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        for (let k = 0; k < 5; k++) {
          Photos.findOrCreate({
            where: {
              photoid: data.results[k].id, 
              username: data.results[k].user.username, 
              link: data.results[k].urls.full,
              productTag: ptag,
              tagID: pid
            },
            default: {tagID: pid}
          })
        }
      })
      .then(photos => res.json(photos))
      .catch(err => console.log(err))
  },
  get: (req, res) => {
    const pid = req.params.id;
    return Photos
      .findAll({
        where: {tagID: pid}
      })
      .then(photos => res.json(photos))
      .catch(err => console.log(err))
  },
  delete: (req, res) => {
    const pid = req.params.id;
    return Photos
      .destroy({
        where: {tagID: pid}
      })
      .then(photos => res.json(photos))
      .catch(err => console.log(err))
  },
  update: (req, res) => {
    const pid = req.params.id;
    const puser = req.params.user;
    return Photos.update({
      username: puser
     }, {
       where: {
         tagID: pid
       }
     })
     .then(photos => res.json(photos))
     .catch(err => console.log(err))
    }
}