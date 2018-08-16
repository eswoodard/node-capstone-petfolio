const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

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
      // username: 'admin',
      // password: 'password',
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
  console.log('$$$$', petSeedData);
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
let user;

function authenticateUser() {
  // console.log('xyz');
  // console.log(app);
  return chai.request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: 'password' })
    .then((res) => {
      console.log('+++++', res.body);
      token = res.body.profile.token;
    })

    .catch(err => console.log(err));
}


describe('Petfolio API resource', () => {
  before(() => runServer(TEST_DATABASE_URL));

  beforeEach((done) => {
    seedPetData()
      .then(() => generateUserData()
        .then(() => done()));
  });

  afterEach(() => tearDownDb());

  after(() => closeServer());

  describe('GET endpoint', () => {
    it('should return all existing pet profiles', () => {
      let res;
      return chai.request(app)
        .get('/pets')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then((_res) => {
          console.log('*****', _res.body);
          res = _res;
          console.log('!!!!', res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf.at.least(1);
          return Pets.count();
        })
        .then((count) => {
          expect(res.body).to.have.lengthOf(count);
        });
    });

    // it('should return pet profiles with right fields', () => {
    //   let resPets;
    //   return chai.request(app)
    //     .get('/pets')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .set('Authorization', `Bearer ${token}`)
    //     .then((res) => {
    //       // console.log(res);
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.json;
    //       expect(res.body).to.be.a('array');
    //       expect(res.body).to.have.lengthOf.at.least(1);

    //       res.body.forEach((pets) => {
    //         expect(pets).to.be.a('object');
    //         expect(pets).to.include.keys(
    //           'avatar', '_id', 'petName', 'petGender', 'PetSpecies', 'petColor', 'petBirthday', 'petAge', 'dateAdopted', 'petVet', 'petAllergies', 'petMedicalCondition', 'petMedications', 'additionalInformation',
    //         );
    //       });
    //       resPets = res.body[0];
    //       return Pets.findById(resPets.id);
    //     })
    //     .then((pets) => {
    //       expect(res.body.id).to.not.be.null;
    //       expect(res.body.petName).to.equal(pets.petName);
    //       expect(res.body.petGender).to.equal(pets.petGender);
    //       expect(res.body.petSpecies).to.equal(pets.petSpecies);
    //       expect(res.body.petColor).to.equal(pets.petColor);
    //       expect(res.body.petBirthday).to.equal(pets.petBirthday);
    //       expect(res.body.petAge).to.equal(pets.petAge);
    //       expect(res.body.dateAdopted).to.equal(pets.dateAdopted);
    //       expect(res.body.petVet).to.equal(pets.petVet);
    //       expect(res.body.petAllergies).to.equal(pets.petAllergies);
    //       expect(res.body.petMedicalCondition).to.equal(pets.petMedicalCondition);
    //       expect(res.body.petMedications).to.equal(pets.petMedications);
    //       expect(res.body.additionalInformation).to.equal(pets.additionalInformation);
    //       expect(res.body.petAvatar).to.equal(pets.avatar);
    //     });
    // });
  });


  // describe('Add POST endpoint', () => {
  //   it('should add a new pet profile', () => {
  //     const newPetProfile = {
  //       petName: faker.name.firstName(),
  //       petGender: faker.hacker.noun(),
  //       petSpecies: faker.hacker.noun(),
  //       petColor: faker.hacker.adjective(),
  //       petBirthday: faker.date.past(),
  //       petAge: faker.random.number(),
  //       dateAdopted: faker.date.past(),
  //       petVet: faker.company.companyName(),
  //       petAllergies: faker.lorem.words(),
  //       petMedicalCondition: faker.lorem.sentence(),
  //       petMedications: faker.lorem.words(),
  //       additionalInformation: faker.lorem.sentences(),
  //       petAvatar: faker.internet.avatar(),
  //     };
  //     return chai.request(app)
  //       .post('/pets')
  //       .set('Content-Type', 'application/json')
  //       .set('Accept', 'application/json')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newPetProfile)
  //       .then((res) => {
  //         // console.log(res.body.pets);
  //         expect(res).to.have.status(201);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.a('object');
  //         expect(res.body).to.include.keys(
  //           'petName', 'petGender', 'PetSpecies', 'petColor', 'petBirthday', 'petAge', 'dateAdopted', 'petVet', 'petAllergies', 'petMedicalCondition', 'petMedications', 'additionalInformation', 'avatar',
  //         );
  //         expect(res.body.id).to.not.be.null;
  //         expect(res.body.petName).to.equal(newPetProfile.petName);
  //         expect(res.body.petGender).to.equal(newPetProfile.petGender);
  //         expect(res.body.petSpecies).to.equal(newPetProfile.petSpecies);
  //         expect(res.body.petColor).to.equal(newPetProfile.petColor);
  //         expect(res.body.petBirthday).to.equal(newPetProfile.petBirthday);
  //         expect(res.body.petAge).to.equal(newPetProfile.petAge);
  //         expect(res.body.dateAdopted).to.equal(newPetProfile.dateAdopted);
  //         expect(res.body.petVet).to.equal(newPetProfile.petVet);
  //         expect(res.body.petAllergies).to.equal(newPetProfile.petAllergies);
  //         expect(res.body.petMedicalCondition).to.equal(newPetProfile.petMedicalCondition);
  //         expect(res.body.petMedications).to.equal(newPetProfile.petMedications);
  //         expect(res.body.additionalInformation).to.equal(newPetProfile.additionalInformation);
  //         expect(res.body.petAvatar).to.equal(newPetProfile.petAvatar);
  //         return Pets.findById(res.body.id);
  //       })
  //       .then((pets) => {
  //         expect(pets.petName).to.equal(newPetProfile.petName);
  //         expect(pets.petGender).to.equal(newPetProfile.petGender);
  //         expect(pets.petSpecies).to.equal(newPetProfile.petSpecies);
  //         expect(pets.petColor).to.equal(newPetProfile.petColor);
  //         expect(pets.petBirthday).to.equal(newPetProfile.petBirthday);
  //         expect(pets.petAge).to.equal(newPetProfile.petAge);
  //         expect(pets.dateAdopted).to.equal(newPetProfile.dateAdopted);
  //         expect(pets.petVet).to.equal(newPetProfile.petVet);
  //         expect(pets.petAllergies).to.equal(newPetProfile.petAllergies);
  //         expect(pets.petMedicalCondition).to.equal(newPetProfile.petMedicalCondition);
  //         expect(pets.petMedications).to.equal(newPetProfile.petMedications);
  //         expect(pets.additionalInformation).to.equal(newPetProfile.additionalInformation);
  //         expect(pets.petAvatar).to.equal(newPetProfile.petAvatar);
  //       });
  //   });
  // });
});
