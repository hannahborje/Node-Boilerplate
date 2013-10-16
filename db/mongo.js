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
// lägg detta någon annanstans?
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

exports.addFriend = function(username, friend, callback) {

    var query = {username: username};

    // hitta min friend-array, spara innehållet
    UserBio.findOne(query, function(err, doc){
        if (err){
            console.log("mongo.js: addFriend(): UserBio.find(): username:" + username );
            // TODO: if err or not err do so and so (callback)
            callback();
        } else {
            console.log("mongo.js: addFriend(): UserBio.findOne: doc.friends: " + doc.friends);
            doc.friends.push(friend);
            doc.save();

            // TODO: if err or not err do so and so (callback)
            callback();
        }
    });
};

exports.removeFriend = function(username, friend, callback){

    var query = {username: username};

    UserBio.findOne(query, function(err, doc){
       if(err){
           console.log("mongo.js: removeFriend(): UserBio.find(): username:" + username );
           callback();
       } else {
           console.log("mongo.js: removeFriend(): UserBio.findOne: doc.friends: " + doc.friends);
           callback();
       }

    });

}

exports.auth = function(username, password, callback){
    User.find({username: username, pass: password}, function(err, docs){
        if (err) console.dir("mongo.js .auth() err: " + err);

        console.dir("mongo.js .auth() => user: " + username + " pass: " + password);
        console.dir("mongo.js .auth() found: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .auth(): docs are empty, no authorization");
            callback(false);
        }
        else{
            console.log("mongo.js .auth():  authorize");
            callback(true);
        }
    });
};

exports.find = function(username, callback){
    console.log("mongo.js.find() was called");

    User.find({username: username}, function(err, docs) {
        if (err) console.dir("mongo.js .find() err: " + err);

        console.dir("mongo.js .find() => user: " + username);
        console.dir("mongo.js .find() resulted in: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .find(): docs are empty, no user occupies that name");
            callback(false);
        }
        else{
            console.log("mongo.js .find(): username is occupied! ");
            callback(true);
        }
    });
};

exports.findAll = function(callback){
    UserBio.find({}, function(err, docs){
        if (err) console.dir("mongo.js .findAll() err: " + err);
        console.dir("mongo.js .findAll()");

        if (docs.length === 0){
            console.log("mongo.js .findAll(): docs are empty");
            callback([{}]);
        }
        else{
            console.log("mongo.js .findAll(): We found something ");
            callback(docs);
        }
    });
};


// Den här funktionen anropas när dashboard reloadas och man vill skicka ny information om alla användare
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
                    console.log("mongo.js: isFriend(): UserBio.find(): friend found:" + friend );
                    callback(true);
                    return;
                }
            }
            // Ingen vän
            console.log("mongo.js: isFriend(): UserBio.find(): friend not found");
            callback(false);
        }
    });
};

exports.save = function(firstname,lastname, username, password){
    // Skapa en användare att sätta in i vår collection
    var user = new User({firstname: firstname, lastname: lastname, username: username, pass: password });
    // Skapa profilinfo
    var userbio = new UserBio({username: username, firstname: firstname, lastname: lastname, city: "Din stad", age: "Ålder",
        occupation: "Yrke", company:"Företag", education:"Utbildning", about: "Om mig", knowledge:"Kunskaper", cv:"CV",
    friends: [] });
    // Skapa inbox
    var userbox = new UserBox({username: username, messages: [] });

    // Each document can be saved to the database by calling its save method.
    // The first argument to the callback will be an error if any occured.
    user.save(function (err, doc) {
        if (err) console.dir("mongo.js .save(user) err: " + err);
        //
        console.dir("mongo.js .save(user) => saved in db: " + doc);
    });
    //
    userbio.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err);
        //
        console.dir("mongo.js .save(bio) => saved in db: " + doc);
    });
    //
    userbox.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err);
        //
        console.dir("mongo.js .save(bio) => saved in db: " + doc);
    });
};


exports.edit = function(username, key, value, callback) {

    var query = {username: username};
    var update = {};
    update[key] = value;


    UserBio.update(query, {$set: update}, {}, function(err, numAffected){
        console.log("mongo.js: edit(): UserBio.update: " + key + ": " + value);
        console.log("err:" + err);
        console.log("numAffected: " + numAffected);
        // if numaffected do so and so (callback)

        // Ändra i user-databasen om det är förnamn och efternamn
        if (key === "firstname" || key === "lastname"){
            User.update(query, {$set: update}, {}, function(err, numAffected){
                console.log("mongo.js: edit(): User.update: " + key + ": " + value + " update[key].value: " + update[key]);
                console.log("err:" + err);
                console.log("numAffected: " + numAffected);
            });
        }
        // TODO: Felhantering
        callback();
    });
};

// Den här funktionen anropas när dashboard reloadas och man vill skicka ny information om alla användare
exports.update = function(username, callback){
    UserBio.findOne({username:username}, function(err, doc){
        if (err) console.log("mongo.js: update(): UserBio.find(): username:" + username );
        // else
        callback(doc);
    });
};


exports.removeFriend = function(username, friend, callback){

    var query = {username: username};

    UserBio.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: removeFriend(): UserBio.find(): err:" + err.msg );
            callback(false);
        } else {
            console.log("mongo.js: removeFriend(): UserBio.findOne: doc.friends: " + doc.friends);
            //var myFriends = doc.friends;
            var removedFriend = doc.friends.indexOf(friend);
            console.log("mongo.js: removeFriend(): UserBio.findOne: index of friend: " + removedFriend);
            // Tag bort vän
            doc.friends.splice(removedFriend,1);
            doc.save();
            callback(true);
        }
    });
};

exports.sendMsg = function(msg, from, to, callback) {

    var query = {username: to};

    console.log("mongo.js, sendMsg(): " + msg+from+to);

    // Hitta vem vi ska skicka till
    UserBox.findOne(query, function(err, doc){
        if(err){
            console.log("mongo.js: sendMsg(): UserBox.findOne(): err:" + err.msg );
            callback();
        } else {
            var newMsg = {from: from, message: msg };
            doc.messages.push(newMsg);
            doc.save();
            console.log("mongo.js: sendMsg(): UserBox.findOne(): success" );
            callback();
        }
    });


};

// TODO: Byt lösenord
// TODO: Inbox