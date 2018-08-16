
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

// const expect = chai.expect;
// const should = require('chai').should();
// const faker = require('faker');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const User = require('../models/user');
// const { app, runServer, closeServer } = require('../server');
// const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');


// chai.use(chaiHttp);

// // used to put randomish documents in db
// // so we have data to work with and assert about.
// function seedFakeUserDb() {
//   console.info('seeding fake user db');
//   const seedData = [];

//   for (let i = 1; i <= 10; i++) {
//     seedData.push(generateUserData());
//   }
//   // this will return a promise
//   return User.insertMany(seedData);
// }

// function generateUserData() {
//   return {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     username: faker.internet.userName(),
//     password: 'password1',
//   };
// }

// function tearDownDb() {
//   console.warn('Deleting database');
//   return mongoose.connection.dropDatabase();
// }


// describe('User api routes', () => {
//   before(() => runServer(TEST_DATABASE_URL));

//   beforeEach(() => seedFakeUserDb());

//   afterEach(() => tearDownDb());

//   after(() => closeServer());


//   // works
//   // describe('GET all users in database', () => {
//   //   it('should get all users in the database', () => {
//   //     const user = generateUserData();
//   //     const token = jwt.sign({ user }, JWT_SECRET);

//   //     return chai.request(app)
//   //       .get('/auth/login')
//   //       .set('Content-Type', 'application/json')
//   //       .set('Accept', 'application/json')
//   //       .set('Cookie', `Token=${token}`)
//   //       .then((res) => {
//   //         res.should.have.status(200);
//   //         res.should.be.json;
//   //       });
//   //   });
//   // });

//   // works
//   describe('DELETE request for /users/:id', () => {
//     it('should delete a user from the database', () => {
//       let deletedUser;
//       const user = generateUserData();
//       const token = jwt.sign({ user }, JWT_SECRET);

//       User
//         .findOne()
//         .then((user) => {
//           deletedUser = user._id;
//           return chai.request(app)
//             .delete(`/users/${deletedUser}`)
//             .set('Authorization', `Bearer ${token}`);
//         })
//         .then((res) => {
//           res.should.have.status(204);
//           return User.findById(deletedUser);
//         })
//         .then((deleted) => {
//           should.not.exist(deleted);
//         });
//     });
//   });

//   // works
//   describe('PUT request for /users/:id', () => {
//     it('should update a user in the database with a specific id', () => {
//       const user = generateUserData();
//       const token = jwt.sign({ user }, JWT_SECRET);

//       const updateData = {
//         email: faker.internet.email(),
//       };

//       User
//         .findOne()
//         .then(user => chai.request(app)
//           .put(`/users/${user.id}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send(updateData))
//         .then((res) => {
//           res.should.have.status(204);
//         })
//         .then((updatedUser) => {
//           updatedUser.should.deep.equal(updateData);
//         });
//     });
//   });

//   // works
//   describe('POST request for /users', () => {
//     it('should create a new user in the database', () => {
//       const newUser = generateUserData();
//       return chai.request(app)
//         .post('/auth/signup')
//         .send(newUser)
//         .then((res) => {
//           res.should.have.status(201);
//           res.should.be.json;
//         });
//     });
//   });
// });
