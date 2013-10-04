/*
 *
 *
 */

var options =  { locals: {
    title : 'Your Page Title'
        ,description: 'Your Page Description'
        ,author: 'Your Name'
        ,analyticssiteid: 'XXXXXXX'
}};


// Ta ej bort, Innehåller intressant funktionalitet
exports.index = function(req,res) {
    res.render("oldindex.jade", options);
};


exports.start = function(req,res) {
    options.locals.title = "Programmeringsklubben";
    res.render("./start.jade", options);
};

exports.dash = function(req,res) {
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
    res.render("./register.jade", options);

};

exports.signin = function(req,res) {
    res.render("./signin.jade", options);
};

exports.validateSignin = function(req,res) {
/*
    var email = req.param('email', '');
    var password = req.param('password', '');
    console.log(email);
    console.log(password);

    var userData = {user:"", pass:""};
    var validData = false;

    if(!validData){
        //res.render("./signin.jade", options); // skicka med rätt fel, options?
        //return "invalid data";
        res.render('hello invalid data', { status: 200, message: 'I am Hello' });
    } else {
        //res.render("./dash.jade", options); // skicka med userData, så vi kan logga in
        //return "valid data";
    }
    */
};

exports.about = function(req,res) {
    res.render("./about.jade", options);
};