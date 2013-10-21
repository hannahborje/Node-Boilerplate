/*
  TDP013 Linköpings universitet
  Projekt: Programmeringsklubben
  2013-10
  Hannah Börjesson (hanbo174), Per Jonsson (perjo927) - IP2

  Testfall med mocha

  Körning (stå i roten av projektet):
  $ mocha
  Ev behöver processen $ mongod också startas
  $ ./node_modules/.bin/mocha -R html-cov > coverage.html för code coverage

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
  det skall kunna motiveras varför vi testar vissa data
  samt varför vi beslutat att begränsa oss till denna data.
*/

var should = require('should');
var request = require('superagent');
var assert = require('assert');

var index = require('../lib-coverage/server.js');

var port = 8082;

var endpoint = "http://0.0.0.0:" + port;

// Förbered save-URL med korrekta parametrar
//var savePath = "/save" + "?msg=Meddelande";
// Förbered flag-URL med korrekta skrina parametrar
//var hexvalue = "5232f3a3e2206ca317000001";
//var flagPath = "/flag" + "?ID=" + hexvalue;


describe('Server', function() {

    // INLOGGAD
       // describe ..
    // EJ INLOGGAD
       // describe ..

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


    /*

        // KRAV:  Det skall finnas möjlighet att via ett HTTP-anrop till den
        // utvecklade Node.js-appen spara ett nytt meddelande i MongoDB.
        describe("GET /save?msg=Meddelande", function() {
            it('should return status 200', function(done) {
                request(endpoint + savePath).end(function(res) {
                    // Ska få 200 tillbaka
                    res.status.should.equal(200);
                    done();
                });
            });
        });

        // KRAV: Om anropet använder felaktiga eller saknar
        //parameterar skall HTTP 400 returneras.
        describe("GET /save", function() {
            it('should return status 400', function(done) {
                request(endpoint + "/save").end(function(res) {
                    res.status.should.equal(400);
                    done();
                });
            });
        });


        // KRAV: Det skall finnas möjlighet att via ett HTTP-anrop till
        // Node.js-applikationen markera ett meddelande som läst i MongoDB.
        describe("GET /flag?ID=hexvalue", function() {
            it('should return status 200', function(done) {
                request(endpoint + flagPath).end(function(res) {
                    // Vi ska få 200 tillbaka
                    res.status.should.equal(200);
                    done();
                });
            });
        });


        // KRAV: Om anropet använder felaktiga eller saknar
        //parameterar skall HTTP 400 returneras.
        describe("GET /flag", function() {
            it('should return status 400', function(done) {
                request(endpoint + "/flag").end(function(res) {
                    res.status.should.equal(400);
                    done();
                });
            });
        });

        // KRAV: Det ska vara möjligt att via HTTP-anrop till Node.js-appen
        // få alla meddelanden som sparats i MongoDB (returneras som JSON).
        describe('GET /getall', function() {
            it('should return JSON', function(done) {
                request(endpoint + "/getall").end(function(res) {
                    console.log("\n\n\n RES: " + res.text + "\n\n\n");
                    // Få en JSON-string
                    checkJSON(res.text).should.equal(true);
                    done();
                });
            });
        });
        */
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
