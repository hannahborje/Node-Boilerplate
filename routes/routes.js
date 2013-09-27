
/*
 *
 */


exports.index = function(req,res) {
    res.render("index.jade",  {
        locals : {
            title : 'Your Page Title'
            ,description: 'Your Page Description'
            ,author: 'Your Name'
            ,analyticssiteid: 'XXXXXXX'
        }
    });
};

exports.default = function(req,res) {
    res.render("default.jade", {
     locals : {
     title : 'Your Page Title'
     ,description: 'Your Page Description'
     ,author: 'Your Name'
     ,analyticssiteid: 'XXXXXXX'
     }
    });

};

exports.fluid = function(req,res) {
    res.render("./layouts/fluid.jade");
};

exports.hero = function(req,res) {
    res.render("./layouts/hero.jade");
};

exports.marketing = function(req,res) {
    res.render("./layouts/marketing-alternate.jade");
};

exports.narrow = function(req,res) {
    res.render("./layouts/marketing-narrow.jade");
};

exports.signin = function(req,res) {
    res.render("./layouts/signin.jade");
};

exports.starter = function(req,res){
    res.render("./layouts/starter-template.jade");
};

exports.sticky = function(req,res) {
    res.render("./layouts/sticky-footer.jade");
};



