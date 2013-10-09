// TODO: Gör färdigt beskrivning
/*************************
 *
 * TDP013
 * Projekt
 * En social webbplats
 * Programmeringsklubben
 *
 * Hannah Börjesson, Per Jonsson, IP2
 * Linköpings Universitet
 *
 * För kravspecifikation, se http://www.ida.liu.se/~TDP013/labs/projekt.sv.shtml
 *
 * Appen är skapad som ett Node.js Boilerplate-projekt (v.2) i WebStorm, och använder
 * html5, express, connect, jade, mongoose/mongoDB, och socket.IO
 * (Rob Righter: https://github.com/robrighter/node-boilerplate)
 * samt Bootstrap med Jade-templating:
 * (Tim Reynolds: https://github.com/timReynolds/jade-bootstrap-examples)
 *
 *
 * Kör $ node server.js för att sätta igång applikationen
 * Öppna 0.0.0.0:8082 i Webbläsaren
 *
 **********************************************************************/

///////////////////////
// Setup Dependencies //
///////////////////////
var connect = require('connect')
    , routes = require('./routes/routes')
    , express = require('express')
    , io = require('socket.io')
    , port = (process.env.PORT || 8082)//;//;
    , mongoose = require('mongoose')
    , MongoStore  = require('connect-mongo')(express)
    , mongo = require('./db/mongo')//;
    , cors = require('cors');

///////////////////
// Setup MongoDB //
///////////////////
var mdb =  "mongodb://localhost:27017/progclub";
mongoose.connect(mdb);


var db = mongoose.connection; // mongod (--smallfiles)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to DB');
});

// var Session = mongoose.model('Session'),

///////////////////
// Setup Express //
///////////////////
var server = express.createServer();

server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({
        secret: "tdp013",
        cookie: {
            maxAge: new Date(Date.now() + 3600000) //60000 // 31557600000
        },
        store: new MongoStore({
            url: mdb //'mongodb://myuser:mypass@localhost:27017/mydb'
            //key:"express.sid"
            //db: 'progclub'
            //collection: 'sessions' // optional: default: sessions
            // password: 'xxx' // optional
            // username: 'admin', // optional
        })
    }));
    server.use(connect.static(__dirname + '/static'));
    server.use(cors()); // behövs för ajax-anrop
    server.use(server.router);
});

// Setup the errors//
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});

// Listen
server.listen(port);

/////////////////////
// Setup Socket.IO //
/////////////////////
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

// Post requests
server.post('/authorize', function(req, res){
    console.log("Authorizing:");

    var user = req.param('user', '');
    var pass = req.param('pass', '');
    console.log("server.js: catching post request for /authorize, user details:");
    console.log(user);
    console.log(pass);

    console.log("server.js: calling mongo.auth(user, pass)");
    // TODO: se om användaren kan auktoriseras
    mongo.auth(user, pass, function(authorized){
        if(authorized){
            console.log("server.js: Authorized: " + user + ". Calling routes.dash");
            res.send("Log-in succesful", 200);
        }else{
            console.log("server.js: Couldn't authorize: " + user + ". Sending response");
            res.send("Vi kunde tyvärr inte logga in dig. Prova igen!", 401);
        }
    });
});

server.post('/try-register', function(req, res){
    var name = req.param('name', ''); // '' blir defaultvärde om inget hittas
    var user = req.param('user', '');
    var pass = req.param('pass', '');

    console.log("server.js: catching post request for /try-register");
    console.log("Hello " + user);
    console.log("server.js: -> mongo.find() trying to find user:  " + user);

    mongo.find(name, user, function(userFound){
        if (userFound){
            console.log("server.js: User " + user  + " was taken, try again  ");
            res.send("Användarnamnet var upptaget. Var vänlig försök igen!", 401); // TODO
        }else{
            console.log("server.js: -> mongo.save() saving user:  " + user);
            mongo.save(name, user, pass);
            res.send("User: " + user + " saved " + 200);
        }
    });
});

// Get requests
server.get('/', routes.start);
server.get('/about', routes.about);
server.get('/dash', routes.dash);

/*

 Session.find({}, function (err, sessions) {
 if (err) console.log(err);
 res.send(sessions);
 });
 */


server.get('/explore', routes.explore);
server.get('/friend', routes.friend);
server.get('/index', routes.index); // ej vår
server.get('/register', routes.register);
server.get('/signin', routes.signin);
server.get('/start', routes.start);


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});


function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

console.log('Listening on http://0.0.0.0:' + port );
