DROP DATABASE IF EXISTS amazon;

CREATE DATABASE amazon;

USE amazon;

CREATE TABLE photos (
  id INT (255) AUTO_INCREMENT,
  photoid VARCHAR(15),
  link VARCHAR(255),
  username VARCHAR(128),
  productTag VARCHAR(64),
  tagID INT(255),
  PRIMARY KEY (id)
)