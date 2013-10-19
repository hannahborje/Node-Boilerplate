/*
 Databas
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 -----------------------------

Skapa defaultmapp för databasen
$ sudo -p mkdir /data/db
$ sudo chmod 0755 /data/db  alt. $ sudo chown $USER /data/db

(Kör ev. igång processen mongod för att kunna få access till databasen)
Starta tjänsten (innan $ node main.js):
$mongod

Ont om utrymme? =>
$mongod --smallfiles

För att använda databasen i shell-läge
$ mongo
> use progclub
> db.users.insert({key:value}); // skapa
> db.users.remove(); // nollställ
> db.users.drop() // tar bort helt och hållet

Öppna http://localhost:28017/ ( = portnr + 1000) i webbläsaren för mer info
*/

var mongoose = require('mongoose');

// importera Schema så att vi kan definiera hur våra collections ska se ut
// Schema-instans = collection
var Schema = mongoose.Schema;

// Definiera hur en användare ska auktoriseras
var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    pass: String
});

// Definiera hur en användare ska auktoriseras
var userBio = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    city: String,
    age: String,
    occupation: String,
    company: String,
    education: String,
    about : String,
    knowledge : String,
    cv: String,
    friends: Array
});

// Samling för inbox-meddelanden
var userBox = new Schema({
    username: String,
    messages: Array
});

// Konvertera/kompilera till en Model (document som ska sättas in i collection)
// Model-instans = document
var User = mongoose.model('User', userSchema);
var UserBio = mongoose.model('UserBio', userBio);
var UserBox = mongoose.model('UserBox', userBox);

// Lägg till vän
exports.addFriend = function(username, friend, callback) {
    var query = {username: username};

    // Hitta min friend-array, spara innehållet
    UserBio.findOne(query, function(err, doc){
        if (err){
            callback();
        } else {
            doc.friends.push(friend);
            doc.save();
            callback();
        }
    });
};

// Ta bort vän
exports.removeFriend = function(username, friend, callback){
    var query = {username: username};

    UserBio.findOne(query, function(err, doc){
       if(err){
           callback();
       } else {
           callback();
       }
    });
};

// Auktorisera användarnamn och lösenord
exports.auth = function(username, password, callback){
    User.find({username: username, pass: password}, function(err, docs){
        if (err) console.dir("mongo.js .auth() err: " + err);

        if (docs.length === 0){
            // Går inte att auktorisera
            callback(false);
        }
        else {
            // Succé
            callback(true);
        }
    });
};

// Se om användaruppgifter är upptagna
exports.find = function(username, callback){
    User.find({username: username}, function(err, docs) {
        if (err) console.dir("mongo.js .find() err: " + err);

        if (docs.length === 0){
            // Inte upptaget
            callback(false);
        }
        else{
            // Upptaget
            callback(true);
        }
    });
};

// Hitta alla profiluppgifter
exports.findAll = function(callback){
    UserBio.find({}, function(err, docs){
        if (err) console.dir("mongo.js .findAll() err: " + err);

        if (docs.length === 0){
            // Inte hittat
            callback([{}]);
        }
        else{
            // Hittat
            callback(docs);
        }
    });
};


// Den här funktionen anropas när dashboard reloadas
// och man vill skicka ny information om alla användare
exports.isFriend = function(username, friend, callback){
    // Gå in i vår "profil" i databasen
    UserBio.findOne({username:username}, function(err, doc){
        if (err) {
            console.log("mongo.js: err:" + err.msg );
            callback(false);
        }
        // Leta om efterfrågad vän finns där
        else {
            for (var f in doc.friends) {
                if (doc.friends[f] === friend) {
                    callback(true);
                    return;
                }
            }
            // Ingen vän
            callback(false);
        }
    });
};

exports.save = function(firstname,lastname, username, password){
    // Skapa en användare att sätta in i vår collection
    var user = new User({firstname: firstname, lastname: lastname, username: username, pass: password });

    // Skapa profilinfo
    var userbio = new UserBio({username: username, firstname: firstname, lastname: lastname,
        city: "Din stad", age: "Ålder",        occupation: "Yrke", company:"Företag",
        education:"Utbildning", about: "Om mig", knowledge:"Kunskaper", cv:"CV", friends: [] });

    // Skapa inbox
    var userbox = new UserBox({username: username, messages: [] });

    // Spara till databasen
    user.save(function (err, doc) {
        if (err) console.dir("mongo.js .save(user) err: " + err);
    });
    //
    userbio.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err);
    });
    //
    userbox.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err);
    });
};

// Redigera profilinfo
exports.edit = function(username, key, value, callback) {

    var query = {username: username};
    var update = {};
    update[key] = value;

    UserBio.update(query, {$set: update}, {}, function(err, numAffected){
        console.log("mongo.edit(), err:" + err);

        // Ändra i user-databasen om det är förnamn och efternamn
        if (key === "firstname" || key === "lastname"){
            User.update(query, {$set: update}, {}, function(err, numAffected){
                console.log("mongo.edit(), err:" + err);
            });
        }

        callback();
    });
};

// Hämta inbox
exports.inbox = function(username, callback) {

    var query = {username: username};

    // Hitta vem vi ska skicka till
    UserBox.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: inbox(): UserBox.findOne(): err:" + err.msg );
            callback();
        } else {
            callback(doc.messages);
        }
    });
};

// Olästa meddelanden blir lästa
exports.markAsRead = function(username, callback) {

    var query = {username: username};

    // Hitta vem vi ska skicka till
    UserBox.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: markAsRead: UserBox.findOne(): err:" + err.msg );
            callback([{}]);
        } else {
            console.log("Mongo: before/after");
            for (var i= 0; i < doc.messages.length; ++i){
                console.log("\t" + doc.messages[i].read);
                doc.messages[i].read = true;
                console.log("\t\t" + doc.messages[i].read);
            }
            // TODO: Det sparas ej permanent
            doc.save(function(err){
                if (err) console.log("doc.save, err: " + err.msg);
                console.log("saved");
            });
            callback(doc);
        }
    });
};

// Den här funktionen anropas när dashboard reloadas
// och man vill skicka ny information om alla användare
exports.update = function(username, callback){
    UserBio.findOne({username:username}, function(err, doc){
        if (err) console.log("mongo.js: update(): UserBio.find(): username:" + username );
        // else
        callback(doc);
    });
};

// Ta bort vän
exports.removeFriend = function(username, friend, callback){
    var query = {username: username};

    UserBio.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: removeFriend(): UserBio.find(): err:" + err.msg );
            callback(false);
        } else {
            var removedFriend = doc.friends.indexOf(friend);

            // Tag bort vän
            doc.friends.splice(removedFriend,1);
            doc.save();
            callback(true);
        }
    });
};


// Skriv ett meddelande -> skicka -> sendMsg
exports.sendMsg = function(msg, from, to, callback) {
    var query = {username: to};

    // Hitta vem vi ska skicka till
    UserBox.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: sendMsg(): UserBox.findOne(): err:" + err.msg );
            callback();
        } else {
            var newMsg = {from: from, message: msg, read: false };
            doc.messages.push(newMsg);
            doc.save();
            callback();
        }
    });
};
