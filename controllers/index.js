const models = require("../models/index.js");
const fetch = require("node-fetch");
const Photos = require("../models").Photos;
const key = require("../src/unsplashAPI/unsplash.js");
const env = require("../config.js");
const query = require("../database/postgres/controller.js");

module.exports = {
  post: (req, res) => {
    const ptag = req.params.ptag;
    const pid = req.params.id;
    fetch(
      `https://api.unsplash.com/search/photos/?query=${ptag}&client_id=${key.accessKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        return query.createPhotos(
          data.results[0].id,
          data.results[0].user.username,
          data.results[0].urls.full,
          ptag,
          pid
        );
      })
      .then(result => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch(err => console.log(err));
  },
  get: (req, res) => {
    const pid = req.params.id;
    return query
      .getPhotos(pid)
      .then(photos => {
        console.log(pid);
        console.log(photos);
        res.status(200).json(photos);
      })
      .catch(err => console.log(err));
  },
  delete: (req, res) => {
    const pid = req.params.id;
    return query
      .deletePhotos(pid)
      .then(photos => {
        console.log(typeof photos);
        if (photos !== "none!") {
          console.log(photos);
          res.status(200).json(photos);
        } else {
          res.status(204).json(photos);
          //fail to send json(photos) it will become an empty object
        }
      })
      .catch(err => console.log(err));
  },
  update: (req, res) => {
    const pid = req.params.id;
    const puser = req.params.user;
    return query
      .updateUser(puser, pid)
      .then(photos => {
        if (photos !== "none!") {
          res.status(200).json(photos);
        } else {
          res.status(204).send(photos);
        }
      })
      .catch(err => console.log(err));
  }
};
