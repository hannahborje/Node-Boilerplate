
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
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
