const {driver, session} = require('./index.js');
const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos} = require('./controller.js');

createPhotos(20003, 'ribbon')