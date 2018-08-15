const express = require('express');
const passport = require('passport');
const multer = require('multer');


const Pets = require('../models/pets');
const Albums = require('../models/albums');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const storage = multer.diskStorage({
  destination: './public/photos',
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });


router.get('/', jwtAuth, (req, res) => {
  console.log(req.user.id);
  Pets.find({ petOwner: req.user.id })
    .then((pets) => {
      console.log(pets);
      res.status(200).json({ pets });
    })
    .catch(err => handleError(res, err));
});

router.post('/', jwtAuth, upload.single('avatar'), (req, res) => {
  // console.log(req.user);
  console.log(req.body);
  console.log(req.file);
  const petOwner = req.user.id;
  const petName = req.body.petName;
  const petGender = req.body.petGender;
  const petSpecies = req.body.petSpecies;
  const petColor = req.body.petColor;
  const petBirthday = req.body.petBirthday;
  const petAge = req.body.petAge;
  const dateAdopted = req.body.dateAdopted;
  const petVet = req.body.petVet;
  const petAllergies = req.body.petAllergies;
  const petMedicalCondition = req.body.petMedicalCondition;
  const petMedications = req.body.petMedications;
  const additionalInformation = req.body.additionalInformation;
  const avatar = { path: req.file.path };
  console.log(req.body);
  Pets.create({
    petOwner,
    petName,
    petGender,
    petSpecies,
    petColor,
    petBirthday,
    petAge,
    dateAdopted,
    petVet,
    petAllergies,
    petMedicalCondition,
    petMedications,
    additionalInformation,
    avatar,
  })
    .then((pets) => {
      res.status(201).json({ pets });
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', jwtAuth, (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const updated = {};
  const updateableFields = ['petName', 'petGender', 'petSpecies', 'petColor', 'petBirthday', 'petAge', 'dateAdopted', 'petVet', 'petAllergies', 'petMedicalCondition', 'petMedications', 'additionalInformation', 'avatar'];
  updateableFields.forEach((field) => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Pets.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then((updatedPets) => {
      res.status(200).json({
        petName: updatedPets.petName,
        petGender: updatedPets.petGender,
        petSpecies: updatedPets.petSpecies,
        petColor: updatedPets.petColor,
        petBirthday: updatedPets.petBirthday,
        petAge: updatedPets.petAge,
        dateAdopted: updatedPets.dateAdopted,
        petVet: updatedPets.petVet,
        petAllergies: updatedPets.petAllergies,
        petMedicalCondition: updatedPets.petMedicalCondition,
        petMedications: updatedPets.petMedications,
        additionalInformation: updatedPets.additionalInformation,
        avatar: updatedPets.avatar,
      });
    })
    .catch(err => res.json({ message: err }));
});

router.delete('/:id', jwtAuth, (req, res) => {
  console.log(req.params.id);
  Pets.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted Pet with id \`${req.params.id}\``);
      res.status(204).json({ Message: 'Pet successfully deleted.' });
    });
});

router.post('/album', jwtAuth, upload.array('photos', 50), (req, res) => {
  console.log(req);
  console.log(req.files);
  const pet = req.body.pet;
  const albumTitle = req.body.albumTitle;
  const albumPhotos = { path: req.files.path };
  Albums.create({
    pet,
    albumTitle,
    albumPhotos,
  })
    .then((album) => {
      res.status(201).json({ album });
    }).catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;
