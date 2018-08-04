const express = require('express');
const passport = require('passport');
const Pets = require('../models/pets');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/pets', (req, res) => {
  res.send('hello');
});

router.post('/pets', (req, res) => {
  console.log(req);
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
  const petAvatar = req.body.petAvatar;
  Pets.findOne({ petName }, (err, pets) => {
    if (err) { res.status(500).send('error occured'); } else if (pets) {
      res.status(500).send('Pet Profile already exists');
    } else {
      Pets.create({
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
        petAvatar,
      }).then((pets) => {
        res.status(201).json({ pets });
      }).catch((err) => {
        res.status(500).json(err);
      });
    }
  });
});

module.exports = router;
