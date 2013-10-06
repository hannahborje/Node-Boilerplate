/**
 * Created by perjo927 on 2013-10-06.
 */
/*
Skapa defaultmapp för databasen
$ sudo -p mkdir /data/db
$ sudo chmod 0755 /data/db  alt. $ sudo chown $USER /data/db

(Kör ev. igång processen mongod för att kunna få access till databasen)
Starta tjänsten (innan $ node main.js):
$mongod

För att använda databasen i shell-läge
$ mongo
> use progclub
> db.users.insert({key:value}); // skapa
> db.users.remove(); // nollställ
> db.users.drop() // tar bort helt och hållet

Öppna http://localhost:28017/ ( = portnr + 1000) i webbläsaren för mer info
*/

var mongoose = require('mongoose');//;//

// importera Schema så att vi kan definiera hur våra collections ska se ut
// Schema-instans = collection
// lägg detta någon annanstans?
var Schema = mongoose.Schema;

// Definiera hur en användare ska auktoriseras
var userSchema = new Schema({
    name: String,
    user: String,
    pass: String
});

// Konvertera/kompilera till en Model (document som ska sättas in i collection)
// Model-instans = document
var User = mongoose.model('User', userSchema);



exports.auth = function(username, password){
    User.find({user: username, pass: password}, function(err, docs){
        if (err) console.dir("mongo.js .auth() err: " + err);
        console.dir("mongo.js .auth() => user: " + username + " pass: " + password);
        console.dir("mongo.js .auth() found: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .auth(): docs are empty, no authorization");
            return false;
        }
        else{
            return true;
        }
    });
};

exports.find = function(fullname, username){
    User.find({name: fullname, user: username}, function(err, docs){
        if (err) console.dir("mongo.js .find() err: " + err);
        console.dir("mongo.js .find() => fullname: " + fullname + " user: " + username);
        console.dir("mongo.js .find() resulted in: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .find(): docs are empty, no user occupies that name");
            return false;
        }
        else{
            console.log("mongo.js .find(): username is occupied! ");
            return true;
        }

    });
    //if not found
    //return false;
    // if found
    //return true;
};

exports.save = function(fullname, username, password){
    // Skapa en användare att sätta in i vår collection
    var user = new User({name: fullname, user: username, pass: password });

    // Each document can be saved to the database by calling its save method.
    // The first argument to the callback will be an error if any occured.

    user.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err); // TODO handle the error
        console.dir("mongo.js .save() => fullname: " + fullname + " user: " + username + " password: " + password);
        console.dir("mongo.js .save() => saved in db: " + doc);
        //console.log(doc.pass);
    });
};


