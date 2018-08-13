const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const User = require('../models/user');
const Pets = require('../models/pets');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

// it('returned status 200 and type html', () => {
//   chai.request('http://localhost:8080')
//     .get('/')
//     .end((req, res) => {
//       expect(res).to.have.status(200);
//       expect(res).to.have.header('content-type', 'text/html');
//       done();
//     });
// });

function seedPetData() {
  console.info('seeding pet info');
  const petSeedData = [];

  for (let i = 1; i <= 10; i++) {
    petSeedData.push({
      petOwner: faker.random.number(),
      petName: faker.name.firstName(),
      petGender: faker.hacker.noun(),
      petSpecies: faker.hacker.noun(),
      petColor: faker.hacker.adjective(),
      petBirthday: faker.date.past(),
      petAge: faker.random.number(),
      dateAdopted: faker.date.past(),
      petVet: faker.company.companyName(),
      petAllergies: faker.lorem.words(),
      petMedicalCondition: faker.lorem.sentence(),
      petMedications: faker.lorem.words(),
      additionalInformation: faker.lorem.sentences(),
      petAvatar: faker.internet.avatar(),
    });
  }
  return Pets.insertMany(petSeedData);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Petfolio API resource', () => {
  before(() => runServer(TEST_DATABASE_URL));

  beforeEach(() => seedPetData());

  afterEach(() => tearDownDb());

  after(() => closeServer());

  describe('Add Pet endpoint', () => {
    it('should add a new pet profile', () => {
      const newPetProfile = {
        petOwner: faker.random.number(),
        petName: faker.name.firstName(),
        petGender: faker.hacker.noun(),
        petSpecies: faker.hacker.noun(),
        petColor: faker.hacker.adjective(),
        petBirthday: faker.date.past(),
        petAge: faker.random.number(),
        dateAdopted: faker.date.past(),
        petVet: faker.company.companyName(),
        petAllergies: faker.lorem.words(),
        petMedicalCondition: faker.lorem.sentence(),
        petMedications: faker.lorem.words(),
        additionalInformation: faker.lorem.sentences(),
        petAvatar: faker.internet.avatar(),
      };
      return chai.request(app)
        .post('/pets')
        .send(newPetProfile)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'petOwner', 'petName', 'petGender', 'PetSpecies', 'petColor', 'petBirthday', 'petAge', 'dateAdopted', 'petVet', 'petAllergies', 'petMedicalCondition', 'petMedications', 'additionalInformation', 'petAvatar',
          );
          expect(res.body.id).to.not.be.null;
          expect(res.body.petOwner).to.equal(newPetProfile.petOwner);
          expect(res.body.petName).to.equal(newPetProfile.petName);
          expect(res.body.petGender).to.equal(newPetProfile.petGender);
          expect(res.body.petSpecies).to.equal(newPetProfile.petSpecies);
          expect(res.body.petColor).to.equal(newPetProfile.petColor);
          expect(res.body.petBirthday).to.equal(newPetProfile.petBirthday);
          expect(res.body.petAge).to.equal(newPetProfile.petAge);
          expect(res.body.dateAdopted).to.equal(newPetProfile.dateAdopted);
          expect(res.body.petVet).to.equal(newPetProfile.petVet);
          expect(res.body.petAllergies).to.equal(newPetProfile.petAllergies);
          expect(res.body.petMedicalCondition).to.equal(newPetProfile.petMedicalCondition);
          expect(res.body.petMedications).to.equal(newPetProfile.petMedications);
          expect(res.body.additionalInformation).to.equal(newPetProfile.additionalInformation);
          expect(res.body.petAvatar).to.equal(newPetProfile.petAvatar);
          return Pets.findById(res.body.id);
        })
        .then((pets) => {
          expect(pets.petOwner).to.equal(newPetProfile.petOwner);
          expect(pets.petName).to.equal(newPetProfile.petName);
          expect(pets.petGender).to.equal(newPetProfile.petGender);
          expect(pets.petSpecies).to.equal(newPetProfile.petSpecies);
          expect(pets.petColor).to.equal(newPetProfile.petColor);
          expect(pets.petBirthday).to.equal(newPetProfile.petBirthday);
          expect(pets.petAge).to.equal(newPetProfile.petAge);
          expect(pets.dateAdopted).to.equal(newPetProfile.dateAdopted);
          expect(pets.petVet).to.equal(newPetProfile.petVet);
          expect(pets.petAllergies).to.equal(newPetProfile.petAllergies);
          expect(pets.petMedicalCondition).to.equal(newPetProfile.petMedicalCondition);
          expect(pets.petMedications).to.equal(newPetProfile.petMedications);
          expect(pets.additionalInformation).to.equal(newPetProfile.additionalInformation);
          expect(pets.petAvatar).to.equal(newPetProfile.petAvatar);
        });
    });
  });
});
