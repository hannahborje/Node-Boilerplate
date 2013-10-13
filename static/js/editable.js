

$(document).ready(function() {
    // Varje gång sidan laddas (.ready()), gör följande:
    // Hämta alla key-values från mongoDB genom nedanstående asynkrona request

    var editables = {};

    $.ajax(
        {url:"/update", dataType:'json',
         success:function(json) {
             console.log("Fick json tillbaka: " + json);
             editables = json;

             $('#firstname').text(editables["firstname"]);
             $('#lastname').text(editables["lastname"]);
             $('#city').text(editables["city"]);
             $('#age').text(editables["age"]);
             $('#occupation').text(editables["occupation"]);
             $('#company').text(editables["company"]);
             $('#education').text(editables["education"]);
             $('#aboutme').text(editables["about"]);
             $('#knowledge').text(editables["knowledge"]);
             $('#cv').text(editables["cv"]);
             //$('#nav-username').text(editables["username"]); // navbar


         },
         error:function(req,data,err) {
             console.log(err);
         }});


    // Ej popupmenyer
    $.fn.editable.defaults.mode = 'inline';

    // pk = key i databasen som ska ändras
    $('#firstname').editable({
        type: 'text',
        url: '/edit',
        title: 'Förnamn',
        pk: 'firstname',

        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
    }
    });
    $('#lastname').editable({
        type: 'text',
        url: '/edit',
        title: 'Efternamn',
        pk: 'lastname',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
    }
    });

    $('#city').editable({
        type: 'text',
        url: '/edit',
        title: 'Ort',
        name: 'Ort',
        value: 'Ort',
        pk: 'city',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
    }
    });


    $('#age').editable({
        type: 'text',
        url: '/edit',
        title: 'Ålder',
        pk: 'age',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
        }
    });


    $('#occupation').editable({
        type: 'text',
        url: '/edit',
        title: 'Yrke',
        pk: 'occupation',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
    }
    });

    $('#company').editable({
        type: 'text',
        url: '/edit',
        title: 'Företag',
        pk: 'company',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
    }
    });

    $('#education').editable({
        type: 'text',
        url: '/edit',
        title: 'Utbildning',
        pk: 'education',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
        }
    });

    $('#aboutme').editable({
        type: 'textarea',
        url: '/edit',
        title: 'Om mig',
        pk: 'about',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
        }
    });

    $('#knowledge').editable({
        type: 'textarea',
        url: '/edit',
        title: 'Kunskap',
        pk: 'knowledge',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
        }
    });

    $('#cv').editable({
        type: 'textarea',
        url: '/edit',
        title: 'CV',
        pk: 'cv',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("editable.js, fel: " + err.status);
        }
    });

});