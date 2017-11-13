/**
 * New node file
 */
var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {

	it('should return the login if the url is correct', function(done) {
		http.get('http://localhost:3002/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the home page if the url is wrong', function(done) {
		http.get('http://localhost:3002/home', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should login', function(done) {
		request.post('http://localhost:3002/users/api/doLogin', {
			form : {
				inputUsername : 'arshii@gmail.com',
				inputPassword : 'arshii'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    
    it('session exist', function(done) {
		request.post('http://localhost:3002/users/api/checkSession', {
			form : {
				inputUsername : 'arshii@gmail.com',
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    
    it('should register', function(done) {
		request.post('http://localhost:3002/users/api/doRegister', {
			form : {
				inputUsername : 'arshii@gmail.com',
        inputPassword : 'arshii',
        Fname         : 'arshiya',
        Lname         : 'sethi'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    
    it('should create dir', function(done) {
		request.post('http://localhost:3002/files/createDir', {
			form : {
				owner :'arshii@gmail.com',
        dirName: 'arshii'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    
    
	});
});
