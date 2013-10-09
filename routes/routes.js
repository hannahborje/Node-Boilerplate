/*
 *
 *
 */


// TODO - sammanställ parametrar
var options =  { locals: {
    title : 'Your Page Title'
        ,description: 'Your Page Description'
        ,author: 'Your Name'
        ,analyticssiteid: 'XXXXXXX'
        ,reqsessionuserid: 'Användarnamn'
}};


// Ta ej bort, Innehåller intressant funktionalitet
// TODO - kolla upp
exports.index = function(req,res) {
    res.render("oldindex.jade", options);
};



exports.start = function(req,res) {
    options.locals.title = "Programmeringsklubben";
    res.render("./start.jade", options);
};

exports.dash = function(req,res, friends) {
    console.log("router.js: rendering dash.jade")
    options.locals.title = "Förnamn Efternamn: Programmeringsklubben"; // TODO
    options.locals.reqsessionuserid = req.session.user_id;
    options.locals.friends = friends;
    res.render("./dash.jade", options);
};

exports.explore = function(req,res) {
    options.locals.title = "Utforska Programmeringsklubben";
    res.render("./explore.jade", options);
};

exports.friend = function(req,res) {
    options.locals.title = "Förnamn Efternamn: Programmeringsklubben"; // TODO: ändra Förnamn efternamn, locals?
    options.locals.reqsessionuserid = req.session.user_id;
    res.render("./friend.jade", options);
};
exports.register = function(req,res) {
    options.locals.title = "Registrera dig hos Programmeringsklubben";
    console.log("routes.js: rendering register.jade");
    res.render("./register.jade", options);
};

exports.signin = function(req,res) {
    console.log("routes.js: rendering signin.jade");
    res.render("./signin.jade", options);
};

exports.about = function(req,res) {
    options.locals.title = "Om Programmeringsklubben";
    res.render("./about.jade", options);
};