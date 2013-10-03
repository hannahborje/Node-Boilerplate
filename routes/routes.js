/*
 *
 *
 */

var headOptions =  { locals: {
    title : 'Your Page Title'
        ,description: 'Your Page Description'
        ,author: 'Your Name'
        ,analyticssiteid: 'XXXXXXX'
}};


// Ta ej bort, Innehåller intressant funktionalitet
exports.index = function(req,res) {
    res.render("oldindex.jade",  headOptions);
};


exports.start = function(req,res) {
    headOptions.locals.title = "Programmeringsklubben";
    res.render("./start.jade", headOptions);
};

exports.dash = function(req,res) {
    headOptions.locals.title = "Din Programmeringsklubb";
    res.render("./dash.jade", headOptions);
};

exports.explore = function(req,res) {
    headOptions.locals.title = "Utforska Programmeringsklubben";
    res.render("./explore.jade", headOptions);
};

exports.friend = function(req,res) {
    headOptions.locals.title = "Förnamn Efternamn: Programmeringsklubben";
    res.render("./friend.jade", headOptions);
};
exports.register = function(req,res) {
    res.render("./register.jade", headOptions);

};

exports.signin = function(req,res) {
    res.render("./signin.jade", headOptions);

    var username = req.param('username', null);
    var email = req.param('email', null);
    var password = req.param('password', null);
    var confirm = req.param('confirm', null);

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirm);
};

exports.about = function(req,res) {
    res.render("./about.jade", headOptions);
};

