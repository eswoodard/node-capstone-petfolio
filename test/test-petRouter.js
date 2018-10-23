const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = require('chai').should();

const expect = chai.expect;
const jwt = require('jsonwebtoken');


const Pets = require('../models/pets');
const User = require('../models/user');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');


chai.use(chaiHttp);


function seedPetData() {
  console.info('seeding pet info');
  const petSeedData = [];

  for (let i = 1; i <= 10; i++) {
    petSeedData.push({
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
      // avatar: faker.image.imageUrl(),
    });
  }
  return Pets.insertMany(petSeedData);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function generateUserData() {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: 'admin',
    password: '$2a$10$3j6VPJMy9FhuV278kIXUd./tw72Yl5KKq4s2TnvHzNP8.9rQzto1u',
  };
  return User.insertMany([user])
    .then(object => authenticateUser())
    .catch((err) => {
      console.log(err);
    });
}

let token;

function authenticateUser() {
  return chai.request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: 'password' })
    .then((res) => {
      token = res.body.profile.token;
    })
    .catch(err => console.log(err));
}

describe('Petfolio API resource', () => {
  before(() => runServer(TEST_DATABASE_URL));

  beforeEach(() => Promise.all([
    seedPetData(),
    generateUserData(),
  ])
    .then(([users]) => {
      user = users[0];
    }));

  afterEach(() => tearDownDb());

  after(() => closeServer());

  describe('GET endpoint', () => {
    it('should return all existing pet profiles', () => {
      let res;
      seedPetData()
        .then(res => chai.request(app)
          .get('/pets')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .then((_res) => {
            res = _res;
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf.at.least(1);
            return Pets.count();
          })
          .then((count) => {
            expect(res.body).to.have.lengthOf(count);
          }));
    });

    it('should return pet profiles with right fields', () => {
      let resPets;
      seedPetData()
        .then(res => chai.request(app)
          .get('/pets')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.lengthOf.at.least(1);

            res.body.forEach((pets) => {
              expect(pets).to.be.a('object');
              expect(pets).to.include.keys(
                '_id', 'petName', 'petGender', 'PetSpecies', 'petColor', 'petBirthday', 'petAge', 'dateAdopted', 'petVet', 'petAllergies', 'petMedicalCondition', 'petMedications', 'additionalInformation',
              );
            });
            resPets = res.body[0];
            return Pets.findById(resPets.id);
          })
          .then((pets) => {
            expect(res.body.id).to.not.be.null;
            expect(res.body.petName).to.equal(pets.petName);
            expect(res.body.petGender).to.equal(pets.petGender);
            expect(res.body.petSpecies).to.equal(pets.petSpecies);
            expect(res.body.petColor).to.equal(pets.petColor);
            expect(res.body.petBirthday).to.equal(pets.petBirthday);
            expect(res.body.petAge).to.equal(pets.petAge);
            expect(res.body.dateAdopted).to.equal(pets.dateAdopted);
            expect(res.body.petVet).to.equal(pets.petVet);
            expect(res.body.petAllergies).to.equal(pets.petAllergies);
            expect(res.body.petMedicalCondition).to.equal(pets.petMedicalCondition);
            expect(res.body.petMedications).to.equal(pets.petMedications);
            expect(res.body.additionalInformation).to.equal(pets.additionalInformation);
            // expect(res.body.avatar).to.equal(pets.avatar);
          }));
    });
  });

  // describe('Add POST endpoint', () => {
  //   it('should add a new pet profile', () => {
  //     const newPetProfile = {
  //       petName: faker.name.firstName(),
  //       petGender: faker.hacker.noun(),
  //       petSpecies: faker.hacker.noun(),
  //       petColor: faker.hacker.adjective(),
  //       petBirthday: faker.lorem.words(),
  //       petAge: faker.lorem.words(),
  //       dateAdopted: faker.lorem.words(),
  //       petVet: faker.company.companyName(),
  //       petAllergies: faker.lorem.words(),
  //       petMedicalCondition: faker.lorem.sentence(),
  //       petMedications: faker.lorem.word(),
  //       additionalInformation: faker.lorem.sentences(),
  //       // avatar: faker.image.imageUrl(),
  //     };
  //     return chai.request(app)
  //       .post('/pets')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newPetProfile)
  //       .then((res) => {
  //         console.log(res);
  //         expect(res).to.have.status(201);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.a('object');
  //         expect(res.body.id).to.not.be.null;
  //         expect(res.body.pets.petName).to.equal(newPetProfile.petName);
  //         expect(res.body.pets.petGender).to.equal(newPetProfile.petGender);
  //         expect(res.body.pets.petSpecies).to.equal(newPetProfile.petSpecies);
  //         expect(res.body.pets.petColor).to.equal(newPetProfile.petColor);
  //         expect(res.body.pets.petBirthday).to.equal(newPetProfile.petBirthday);
  //         expect(res.body.pets.petAge).to.equal(newPetProfile.petAge);
  //         expect(res.body.pets.dateAdopted).to.equal(newPetProfile.dateAdopted);
  //         expect(res.body.pets.petVet).to.equal(newPetProfile.petVet);
  //         expect(res.body.pets.petAllergies).to.equal(newPetProfile.petAllergies);
  //         expect(res.body.pets.petMedicalCondition).to.equal(newPetProfile.petMedicalCondition);
  //         expect(res.body.pets.petMedications).to.equal(newPetProfile.petMedications);
  //         expect(res.body.pets.additionalInformation).to.equal(newPetProfile.additionalInformation);
  //         expect(res.body.pets.avatar).to.equal(newPetProfile.avatar);
  //         return Pets.findById(res.body.id);
  //       });
  //   });
  // });

  // describe('Add PUT endpoint', () => {
  //   it('should update profile based on fields sent', () => {
  //     const updatedPetProfile = {
  //       petName: faker.name.firstName(),
  //       petGender: faker.hacker.noun(),
  //       petSpecies: faker.hacker.noun(),
  //       petColor: faker.hacker.adjective(),
  //       petBirthday: faker.lorem.words(),
  //       petAge: faker.lorem.words(),
  //       dateAdopted: faker.lorem.words(),
  //       petVet: faker.company.companyName(),
  //       petAllergies: faker.lorem.words(),
  //       petMedicalCondition: faker.lorem.sentence(),
  //       petMedications: faker.lorem.word(),
  //       additionalInformation: faker.lorem.sentences(),
  //       // avatar: faker.image.imageUrl(),
  //     };
  //     return Pets
  //       .findOne()
  //       .then((pet) => {
  //         updatedPetProfile.id = pet.id;
  //         return chai.request(app)
  //           .put(`/pets/${pet.id}`)
  //           .set('Authorization', `Bearer ${token}`)
  //           .send(updatedPetProfile);
  //       })
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         return Pets.findById(updatedPetProfile.id);
  //       })
  //       .then((post) => {
  //         post.petName.should.equal(updatedPetProfile.petName);
  //         post.petGender.should.equal(updatedPetProfile.petGender);
  //         post.petSpecies.should.equal(updatedPetProfile.petSpecies);
  //         post.petColor.should.equal(updatedPetProfile.petColor);
  //         post.petBirthday.should.equal(updatedPetProfile.petBirthday);
  //         post.petAge.should.equal(updatedPetProfile.petAge);
  //         post.dateAdopted.should.equal(updatedPetProfile.dateAdopted);
  //         post.petVet.should.equal(updatedPetProfile.petVet);
  //         post.petAllergies.should.equal(updatedPetProfile.petAllergies);
  //         post.petMedicalCondition.should.equal(updatedPetProfile.petMedicalCondition);
  //         post.petMedications.should.equal(updatedPetProfile.petMedications);
  //         post.additionalInformation.should.equal(updatedPetProfile.additionalInformation);
  //         // post.avatar.should.equal(updatedPetProfile.avatar);
  //       });
  //   });
  // });

  describe('Add DELETE endpoint', () => {
    it('should delete a pet by id', () => {
      let deletedPet;

      return Pets
        .findOne()
        .then((_pets) => {
          deletedPet = _pets;
          return chai.request(app)
            .delete(`/pets/${deletedPet._id}`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then((res) => {
          res.should.have.status(204);
          return Pets.findById(deletedPet._id);
        })
        .then((pets) => {
          should.not.exist(pets);
        });
    });
  });
});
