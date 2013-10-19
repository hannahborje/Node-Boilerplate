/*
Funktioner för rendering av jade-filer
*********************
Programmeringsklubben
TDP013 Linköpings universitet
http://www.ida.liu.se/~TDP013/
2013-10 HT Läsperiod 1
Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
https://github.com/hannahborje/Node-Boilerplate
*/

// Variabler till jade-templates
var options =  { locals: {
    title : 'Programmeringsklubben'
        ,description: 'Programmeringsklubben. En social webbplats och ett projekt på Linköpings universitet.'
        ,author: 'Hannah Börjesson, Per Jonsson'
        ,reqsessionuserid: 'Användarnamn'
}};

// Hem / start
exports.start = function(req,res) {
    res.render("./start.jade", options);
};

// Kontrollpanel / dashboard
exports.dash = function(req,res, friends, me) {
    options.locals.title = "Programmeringsklubben: " + me;
    options.locals.reqsessionuserid = req.session.user_id;
    options.locals.friends = friends;

    res.render("./dash.jade", options);
};

// Utforska
exports.explore = function(req,res) {
    options.locals.title = "Programmeringsklubben: Utforska";
    res.render("./explore.jade", options);
};

// Template för vän eller användare som inte är vän
exports.friend = function(req,res, friendData, isFriend) {
    var fullname = friendData["firstname"] + " " + friendData["lastname"];

    options.locals.title = "Programmeringsklubben: " +  fullname;
    options.locals.username =  friendData["username"];
    options.locals.reqsessionuserid = req.session.user_id;
    options.locals.isFriend = true;
    options.locals.isMe = false;

    // Om vi browsar oss själva
    if (friendData['username'] == req.session.user_id) {
        options.locals.friendtext = "Det här är du";
        options.locals.isMe = true;
    }
    // Om vi browsar okänd eller känd
    else if (isFriend){
        options.locals.friendtext = "Ni är vänner";
    } else {
        options.locals.friendtext = "Lägg till som vän";
        options.locals.isFriend = false;
    }

    res.render("./friend.jade", options);
};

// Registrering av ny användare
exports.register = function(req,res) {
    options.locals.title = "Registrera dig hos Programmeringsklubben";
    res.render("./register.jade", options);
};

exports.signin = function(req,res) {
    options.locals.title = "Logga in hos Programmeringsklubben";
    res.render("./signin.jade", options);
};

exports.about = function(req,res) {
    options.locals.title = "Om Programmeringsklubben";
    res.render("./about.jade", options);
};