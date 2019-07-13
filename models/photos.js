'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    photoid: DataTypes.STRING,
    link: DataTypes.STRING,
    username: DataTypes.STRING,
    productTag: DataTypes.STRING,
    tagID: DataTypes.STRING
  }, {});
  Photos.associate = function(models) {
    // associations can be defined here
  };
  return Photos;
};