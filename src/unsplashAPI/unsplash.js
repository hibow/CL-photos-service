require("dotenv").config();
const secrets = require("../../secrets.js");
module.exports = {
  accessKey: secrets.get("unsplashKey") || process.env.unsplashKey
};
