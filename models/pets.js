const mongoose = require('mongoose');

// const petAlbumSchema = new mongoose.Schema({
//   pet: { type: String, required: true },
//   albumTitle: { type: String },
//   albumPhotos: [{
//     path: { type: String },
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

});


const pets = mongoose.model('Pets', petSchema);
// const albums = mongoose.model('Album', petAlbumSchema);

module.exports = pets;
// module.exports = albums;
