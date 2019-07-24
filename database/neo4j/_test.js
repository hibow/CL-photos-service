const {driver, session} = require('./index.js');
const {getPhotos, getPhotosCounts, updateUser, deletePhotos, createPhotos, getPhotosFromTag, getPhotosFromUser} = require('./query.js');

// updateUser('hibow', 26)
getPhotos(1);
// deletePhotos(19);
// getPhotosFromTag('Chocolate');
// getPhotosFromUser('hibow');
// createPhotos(200001, 'kiwi');