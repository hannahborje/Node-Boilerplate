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
 * html-boilerplate, express, connect, jade och Socket.IO
 * (Rob Righter: https://github.com/robrighter/node-boilerplate)
 * samt Bootstrap med Jade-templating:
 * (Tim Reynolds: https://github.com/timReynolds/jade-bootstrap-examples)
 *
 * Interaktion sker även med MongoDB
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
    , mongoose = require('mongoose')//;//
    , mongo = require('./db/mongo')//;
    , cors = require('cors');

///////////////////
// Setup MongoDB //
///////////////////
require('express-mongoose');// koppla ihop express med mongoose
var mdb =  "mongodb://localhost:27017/progclub";
mongoose.connect(mdb); //, users?


var db = mongoose.connection; // mongod (--smallfiles)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
    console.log('Connected to DB');
});


// collections: users, ... ??


///////////////////
// Setup Express //
///////////////////
var server = express.createServer();

server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
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

     var user = req.param('email', '');
     var pass = req.param('password', '');
     console.log("server.js: catching post request for /authorize, user details:");
     console.log(user);
     console.log(pass);

    console.log("server.js: catching post request for /authorize, calling mongo.auth(user, pass)");
     // se om användaren kan auktoriseras
     if (mongo.auth(user, pass)){
         console.log("server.js: mongo.auth() returned true");
         console.log("res.header " +  res.headerSent); // CORS???
         res.json("200", 200); //// var jsonString = JSON.stringify(results);
     }else{
         console.log("server.js: mongo.auth() returned false");
         res.send("server, not authorized", 200);
     }
    // /authorize ska inte renderas !!!
    //res.send("server.js: authorized: " + user + " " + pass, 200); // skickas till signin.jade, ajaxanropet där, ajax.js (CORS)
    //routes.dash(req, res); med options se mongoose-dokumentation
});
server.post('/signin', function(req, res){
    var name = req.param('name', ''); // tom sträng '' blir defaultvärde om inget hittas
    var user = req.param('email', '');
    var pass = req.param('password', '');

    console.log("server.js: catching post request for /signin, user details:");
    console.log("Hej " + name);


    // Detta borde tas om hand tidigare
    if (mongo.find(name, user)){
        console.log("server.js: mongo.find() returned true => There already was a: " + user); // ... Please login
    }else{
        console.log("server.js: mongo.find() returned false => You are now registered with username: " + user); // ... Please login
        // if not mongo.find()!! spara isf
        mongo.save(name, user, pass); // borde tas om hand steget innan
    }

    // Skicka med meddelandena
    routes.signin(req ,res);
});

// Get requests
server.get('/', routes.start);
server.get('/about', routes.about);
server.get('/dash', routes.dash);
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
