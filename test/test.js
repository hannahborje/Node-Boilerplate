/*
  TDP013 Linköpings universitet
  Projekt: Programmeringsklubben
  2013-10
  Hannah Börjesson (hanbo174), Per Jonsson (perjo927) - IP2

  Testfall med mocha

  Körning (stå i roten av projektet):
  $ mocha

  Ev behöver processen $ mongod också startas

  Installera mocha globalt:  $ sudo npm install -g mocha
  Installera mocha i projektmappen:  $ npm install mocha
  Samt i projektmappen:
  • npm install should
  • npm install superagent
  * (ev.) npm install assert
  * ev. npm install mongodb om den rapporteras saknad

  KRAV:
  Testning av backend  skall ske med Mocha (med JScoverage)

  Alla huvudsakliga funktioner skall testas grundligt,
  Vi testar här alla URL:er som vi kan anropa och att de ger
  tillbaka förväntat resultat.
*/

var should = require('should');
var request = require('superagent');
var assert = require('assert');
//var expect = require('expect');
var index = require('../lib-coverage/server.js');

var port = 8082;

var endpoint = "http://0.0.0.0:" + port;


describe('Server', function() {

    // Om anropet har en omappad URL ska vi redirectas och få 200 tillbaka
    describe("GET /undefined", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/undefined").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    // Om anropet har en omappad URL ska vi redirectas och få 200 tillbaka
    describe("GET /", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    // Om anropet har en omappad URL ska vi redirectas och få 200 tillbaka
    describe("GET /*", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/*").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    // Om anropet har en omappad URL ska vi redirectas och få 200 tillbaka
    describe("GET /about", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/about").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

       // Om anropet har en omappad URL ska vi redirectas och få 200 tillbaka
    describe("GET /dash", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/dash").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("GET /explore", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/explore").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("GET /friend", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/friend").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("GET /getUsers", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/getUsers").end(function(res) {
                res.status.should.equal(200);
                if (checkJSON(res.text)){
                    checkJSON(res.text).should.equal(true);
                }
                done();
            });
        });
    });

    describe("GET /register", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/register").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });


    describe("GET /signin", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/signin").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

        describe("GET /start", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/start").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("GET /update", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/friend").end(function(res) {
                res.status.should.equal(200);
                if (checkJSON(res.text)){
                    checkJSON(res.text).should.equal(true);
                }
                done();
            });
        });
    });

    describe("GET /updateFriend", function() {
        it('should return status 200', function(done) {
            request(endpoint + "/friend").end(function(res) {
                res.status.should.equal(200);
                if (checkJSON(res.text)){
                    checkJSON(res.text).should.equal(true);
                }
                done();
            });
        });
    });

    describe("POST /removeFriend", function() {
        it('should return status 200', function(done) {
            request.post(endpoint + "/removeFriend").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("POST /sendMsg", function() {
        it('should return status 200', function(done) {
            request.post(endpoint + "/sendMsg").end(function(res) {
                res.status.should.equal(200);
                done();
            });
        });
    });

    describe("POST /authorize", function() {
        it('should return status 401', function(done) {
            request.post(endpoint + "/authorize")
                .set('user', 'bar')
                .set('pass', 'baz')
                .end(function(res) {
                    res.status.should.equal(401);
                    done();
                });
        });
    });

    describe("POST /tryRegister", function() {
        it('should return status 404', function(done) {
            request.post(endpoint + "/tryRegister")
                .set('user', 'bar')
                .set('pass', 'baz')
                .end(function(res) {
                res.status.should.equal(404);
                done();
            });
        });
    });
});

// Kollar om en sträng är JSON
function checkJSON(text) {
    try {
        JSON.stringify(text);
        return true;
    } catch(err) {
        console.log("not JSON");
        return false;
    }
}

