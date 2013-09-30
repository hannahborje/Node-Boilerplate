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
    , port = (process.env.PORT || 8082);

//////////////////
//Setup Express //
//////////////////
var server = express.createServer();

server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
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

server.get('/', routes.start);
server.get('/explore', routes.explore);
server.get('/index', routes.index); // ej vår
server.get('/register', routes.register);
server.get('/signin', routes.signin);


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
