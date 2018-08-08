const express = require('express');
const passport = require('passport');
const multer = require('multer');


// const upload = multer({ dest: '..public/photos' });
const Pets = require('../models/pets');


const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const storage = multer.diskStorage({
  destination: '../public/photos',
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/pets', jwtAuth, (req, res) => {
  console.log(req.user.id);
  Pets.find({ petOwner: req.user.id })
    .then((pets) => {
      console.log(pets);
      res.status(200).json({ pets });
    })
    .catch(err => handleError(res, err));
});


router.post('/pets', jwtAuth, upload.single('avatar'), (req, res) => {
  console.log(req.file.avatar);
  const petOwner = req.user.id;
  console.log(petOwner);
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
  const avatar = req.file.avatar;
  Pets.findOne({ petName }, (err, pets) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else if (pets) {
      res.status(500).send('Pet Profile already exists');
    } else {
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
    }
    if (!req.file) {
      console.log('no file received');
      return res.send({
        success: false,
      });
    }
    console.log('file received', req.file.avatar);
    return res.send({
      success: true,
    });
  });
});

module.exports = router;
