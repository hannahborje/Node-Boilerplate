/********************************************************************
 *
 * TDP013
 * Projekt
 * En social webbplats
 * Programmeringsklubben
 *
 * Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 * Linköpings Universitet
 *
 * För kravspecifikation,
 * se http://www.ida.liu.se/~TDP013/labs/projekt.sv.shtml
 *
 * Appen är skapad som ett Node.js Boilerplate-projekt (v.2)
 * i WebStorm (JetBrains),
 * och använder HTML5, Express, Connect, Jade, MongoDB, JQuery ...
 * (se Rob Righter: https://github.com/robrighter/node-boilerplate)
 * ... samt Bootstrap med Jade-templating:
 * (Tim Reynolds: https://github.com/timReynolds/jade-bootstrap-examples)
 * (getbootstrap.com)
 *
 * ----------------------------------------------------------
 * Kör $ node server.js för att sätta igång applikationen   |
 * Öppna sedan 0.0.0.0:8082 i Webbläsaren                   |
 *                                                          |
 * Starta (eventuellt) processen mongod för databasen innan |
 * $ mongod                                                 |
 * ----------------------------------------------------------
 *
 * Git: https://github.com/hannahborje/Node-Boilerplate
 *
 **********************************************************************/

///////////////////////
//  Dependencies     //
///////////////////////
var connect = require('connect')
    , routes = require('./routes/routes')
    , express = require('express')
    , port = (process.env.PORT || 8082)//;//;
    , mongoose = require('mongoose')
    , MongoStore  = require('connect-mongo')(express)
    , mongo = require('./db/mongo')//;
    , cors = require('cors');

///////////////////
//       MongoDB //
///////////////////
var mdb =  "mongodb://localhost:27017/progclub";

mongoose.connect(mdb);

var db = mongoose.connection; // kom ihåg $mongod
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to DB');
});

///////////////////
//  Express      //
///////////////////
var server = express.createServer();

server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    // För inloggning
    server.use(express.session({
        secret: "tdp013",
        cookie: {
            maxAge: new Date(Date.now() + 3600000) // Hur länge hållas inloggad?
        },
        store: new MongoStore({
            url: mdb //'mongodb://myuser:mypass@localhost:27017/mydb'

        })
    }));
    server.use(connect.static(__dirname + '/static'));
    server.use(cors()); // behövs för ajax-anrop, cross-domain
    server.use(server.router);
});

// Felhantering
server.error(function(err, req, res, next){
    res.render('500.jade', { locals: {
              title : 'Programmeringsklubben - Fel 500 - Server-fel'
             ,description: 'Programmeringsklubben'
             ,author: 'Hannah Börjesson, Per Jonsson'
             ,reqsessionuserid: 'Användarnamn'
             ,error: err
            },status: 500 });
});

// Lyssna
server.listen(port);

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

var allUsers = [{}]; // Plats för att spara alla användare i, vid sökning
var inbox = [{}]; // Plats för att spara inboxar
var friendInbox = [{}]; // Plats för att spara inboxar

// Kontrollpanel
var dash = function(req, res){

    var friends = {};
    var me = req.session.user_id;
    var nameOfMe = "";

    // Hämta information om användare
    mongo.findAll(function(result){

        // Spara undan
        allUsers = result;

        // Loopa igenom alla användare
        for (var f in allUsers){
            // AKtuellt användarnamn
            var user = allUsers[f].username;

            // Om användaren är jag
            if (user == me){
                // Vad heter jag
                nameOfMe = allUsers[f].firstname + " " + allUsers[f].lastname;

                // Gå igenom alla mina vänner
                for (var e = 0; e < allUsers[f].friends.length; e++) {
                    // Lägg till i en vänlista
                    friends[allUsers[f].friends[e]] = "";
                }
            }
        }
        // Loopa igenom alla användare IGEN
        for (var f in allUsers){
            // Om användaren är en vän
            var user = allUsers[f].username;

            if (friends[user] === "")
            { friends[user] = [(allUsers[f].firstname + " "  + allUsers[f].lastname), user];}
        }
        routes.dash(req, res, friends, nameOfMe);
    });
};

// Auktorisering av requestade URL:er
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        dash(req, res);
    } else {
        next();
    }
}

// POST requests //

// Lägg till en vän
server.post('/addFriend', function(req, res){
    var friendUsername = req.param('username', '');
    var username = req.session.user_id;

    mongo.addFriend(username, friendUsername, function(){
        res.json(200);
    })
});

// Inloggning
server.post('/authorize', function(req, res){
    var user = req.param('user', '');
    var pass = req.param('pass', '');

    mongo.auth(user, pass, function(authorized){
        if(authorized){
            req.session.user_id = user;
            res.send("Lyckad inloggning", 200);
        } else {
            res.send("Vi kunde tyvärr inte logga in dig. Prova igen!", 401);
        }
    });
});

// Redigering av profil
server.post('/edit', checkAuth, function(req, res){
    var value = req.param('value', '');
    var key = req.param('pk', '');

    mongo.edit(req.session.user_id, key, value, function(){
        res.send("Redigerat: " + key);
    });
});


// Hämta meddelanden till användarens vägg
server.post("/friendWall", function(req, res){
    var friendName = req.param("username", " ");

    mongo.inbox(friendName, function(messages){
        friendInbox = messages;
    });

    var navData = {inbox: friendInbox};

    // Skicka tilbaka till ajax
    res.json(navData, 200);
});


// Ta bort en vän
server.post('/removeFriend', checkAuth, function(req,res){
    // parsa req-parameter
    var friendName = req.param('username', '');

    // Ta bort ur databasen, ur egna vänner
    mongo.removeFriend(req.session.user_id, friendName, function(isRemoved){
        if (!isRemoved){
            console.log("server.js, /removeFriend, mongo.removeFriend(): error" );
        }else {
            console.log("server.js, /removeFriend, mongo.removeFriend(): success" );
        }
    });

    res.send(200);
});

// TODO:
// Skriv ett meddelande på en vägg
server.post('/sendMsg', checkAuth, function(req,res){
    var msg = req.param('message', '');
    var from = req.session.user_id;
    var to = req.param('receiver', '');

    console.log("server.js, /sendMsg:  msg, from, to: " + msg+from+to);

    mongo.sendMsg(msg, from, to, function() {
        res.send(200);
    });
});

// Registrera en ny användare
server.post('/try-register', function(req, res){
    var firstname = req.param('firstname', ''); // '' blir defaultvärde om inget hittas
    var lastname = req.param('lastname', '');
    var user = req.param('user', '');
    var pass = req.param('pass', '');

    mongo.find(user, function(userFound){
        if (userFound){
            res.send("Användarnamnet var upptaget. Var vänlig försök igen!", 401);
        } else {
            mongo.save(firstname, lastname, user, pass);
            res.send("User: " + user + " saved " + 200);
        }
    });
});


// GET requests //

// Startsidan
server.get('/', function(req, res) {
    if (!req.session.user_id) {
        routes.start(req, res);
    } else {
        dash(req, res);
    }
});

// Om oss
server.get('/about', function(req, res) {
    if (!req.session.user_id) {
        routes.about(req, res);
    } else {
        dash(req, res);
    }
});

// Kontrollpanelen
server.get('/dash', checkAuth, dash);

// Utforska
server.get('/explore', function(req, res) {
    if (!req.session.user_id) {
        routes.explore(req, res);
    } else {
        dash(req, res);
    }
});

// Hämta användar-info
server.get('/getUsers', checkAuth, function(req, res){
        res.json(allUsers, 200);
});

// Vän/användarsida
server.get('/friend',checkAuth, function(req, res) {
    // Vem är den sökta vännen
    var friend =  req.query.user;

    // Är requesten korrekt skriven? Isf finns användarnamnet i URL:en
    // Om den är korrekt, gör följande
    if (friend != undefined){
        // Hämta data om vännen
        mongo.update(friend, function(friendDoc){

            // Är detta en vän?
            mongo.isFriend(req.session.user_id, friend, function(is_Friend){
                if (is_Friend){
                    // Ändra text på knappen i jade-filen
                    routes.friend(req, res, friendDoc, is_Friend);
                } else {
                    // Inte vän, skicka med den infon
                    routes.friend(req, res, friendDoc, is_Friend);
                }
            });
        });
    // Skicka tillbaka om ofullständig URL
    } else { routes.start(req, res); }
});

// Logga ut (ajax-request)
server.get('/logout', function(req, res) {
    delete req.session.user_id; // if existing?
    res.redirect('/');
});

//
// Markera att vi läst meddelanden
server.get('/mark', function(req, res) {
    console.log("server.js MarkAsRead");

    /*
     var username = req.session.user_id;

     mongo.markAsRead(username, function(result){
     console.log("server.js mongo.js markAsRead");
     res.send(200);
     });
     */
    res.send(200);
});


// Hämta information till navbar
server.get('/navbar', function(req, res) {
    var username = req.session.user_id;

    // Hämta info om olästa meddelanden
    mongo.inbox(username, function(messages){
        inbox = messages;
    });

    var navData = {inbox: inbox};
    // Skicka till anropande ajax
    res.json(navData, 200);
});

// Registrera oss
server.get('/register', routes.register);

// Logga in
server.get('/signin', function(req, res) {
    if (!req.session.user_id) {
        routes.signin(req, res);
    } else {
        routes.dash(req, res);
    }
});

// Startsida / hem
server.get('/start',
    function(req, res) {
        if (!req.session.user_id) {
            routes.start(req, res);
        } else {
            routes.dash(req, res);
        }
});

// Hämtar data om inloggad användare
server.get('/update',checkAuth, function(req, res){
    mongo.update(req.session.user_id, function(doc){
        res.json(doc, 200);
    });
});

// Ny info om vän
server.get('/updateFriend',checkAuth, function(req, res){
    mongo.update(req.query.username, function(doc){
        res.json(doc, 200);
    });
});

// Okänt fel
server.get('/500', function(req, res){
    throw new Error('500 Error');
});

// 404 Fel URL
server.get('/*', function(req, res){
    //throw new NotFound;
    res.redirect('/');
});


// Nu kör vi
console.log('Listening on http://0.0.0.0:' + port );
