const mongoose = require('mongoose');


// const petAlbumSchema = new mongoose.Schema({
//   pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true },
//   albumTitle: String,
//   albumAvatar: {
//     path: { type: String },
//   },
//   albumPhotos: [{
//     path: { type: String },
//     caption: { type: String },
//   }],
// });

const petSchema = new mongoose.Schema({

  petOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  petName: {
    type: String,
    required: true,
  },
  petGender: String,
  petSpecies: {
    type: String,
    required: true,
  },
  petColor: String,
  petBirthday: String,
  petAge: String,
  dateAdopted: String,
  petVet: String,
  petAllergies: String,
  petMedicalCondition: String,
  petMedications: String,
  additionalInformation: String,
  avatar: {
    path: { type: String },
  },
  // petAlbum: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Albums' }],
});


// const albums = mongoose.model('Albums', petAlbumSchema);
const pets = mongoose.model('Pets', petSchema);

module.exports = pets;
// module.exports = albums;
