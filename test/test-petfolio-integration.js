const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const app = express();
chai.use(chaiHttp);

it('returned status 200 and type html', function() {
  chai.request('http://localhost:8080')
    .get('/')
    .end(function (req, res) {
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'text/html');
      done();
    });
  });



