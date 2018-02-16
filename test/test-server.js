const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test';

chai.should();

chai.use(chaiHttp);

describe('initial build', function () {

	before(function () {
		return runServer(TEST_DATABASE_URL, 63000);
	});

	after(function () {
		return closeServer();
	});

	describe('index page', function () {
		it('should exist', function () {
			return chai.request(app)
				.get('/')
				.then(function (res) {
					res.should.have.status(200);
				});
		});
	});

	describe('create page', function () {
		it('should exist', function () {
			return chai.request(app)
				.get('/create')
				.then(function (res) {
					res.should.have.status(200);
				});
		});
	});

});
