/*
 *
 *
 */


// TODO - sammanställ
var options =  { locals: {
    title : 'Your Page Title'
        ,description: 'Your Page Description'
        ,author: 'Your Name'
        ,analyticssiteid: 'XXXXXXX'
}};


// Ta ej bort, Innehåller intressant funktionalitet
// TODO - kolla upp
exports.index = function(req,res) {
    res.render("oldindex.jade", options);
};


/*
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('Du har inte tillåtelse att se den här sidan. Tihi. Var god logga in eller registrera dig');
    } else {
        next();
    }
}
*/


exports.start = function(req,res) {
    options.locals.title = "Programmeringsklubben";
    res.render("./start.jade", options);
};

exports.dash = function(req,res) {
    console.log("router.js: rendering dash.jade")
    options.locals.title = "Din Programmeringsklubb";
    res.render("./dash.jade", options);
};

exports.explore = function(req,res) {
    options.locals.title = "Utforska Programmeringsklubben";
    res.render("./explore.jade", options);
};

exports.friend = function(req,res) {
    options.locals.title = "Förnamn Efternamn: Programmeringsklubben";
    res.render("./friend.jade", options);
};
exports.register = function(req,res) {
    console.log("routes.js: rendering register.jade");
    res.render("./register.jade", options);
};

exports.signin = function(req,res) {
    console.log("routes.js: rendering signin.jade");
    res.render("./signin.jade", options);
};

exports.about = function(req,res) {
    res.render("./about.jade", options);
};