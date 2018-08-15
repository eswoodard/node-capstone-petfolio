const mongoose = require('mongoose');

const petAlbumSchema = new mongoose.Schema({
  pet: { type: String, required: true },
  albumTitle: { type: String },
  albumPhotos: [{
    path: { type: String },
  }],
});

const albums = mongoose.model('Album', petAlbumSchema);
module.exports = albums;
