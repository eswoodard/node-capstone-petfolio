const mongoose = require('mongoose');

const petAlbumSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true },
  albumTitle: { type: String },
  albumPhotos: [{
    path: { type: String },
    caption: { type: String },
  }],
});


const album = mongoose.model('Album', petAlbumSchema);
module.exports = album;
