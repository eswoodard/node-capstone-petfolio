const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
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
  petAvatar: {
    path: { type: String },
  },
  petAlbum: [{
    albumTitle: String,
    albumPhotos: [{
      path: { type: String },
      caption: { type: String },
    }],
  }],
});

const pets = mongoose.model('Pets', petSchema);
module.exports = pets;
