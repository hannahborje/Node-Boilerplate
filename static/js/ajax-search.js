
$(document).ready(function(){

    console.log("ajax-search.jade: kör jQuery-script");

    // gör en post-request till databasen
    var userSource = [""];
    var userDB = [{}];
    var userLinks = {};


    $('.typeahead').typeahead({
        source: function(){
            console.log("ajax-search.js: posting to url: getUsers");
            var posting =  $.post("/getUsers");

            // Put the results in a div
            posting.done(function( data, textStatus ) {
                console.dir("ajax-search.js: posting done(success)" );
                console.log("ajax-search.js: textStatus = " + textStatus);

                userDB = data;
                for (var user in data){
                    userSource[user] = data[user]["firstname"] + " " + data[user]["surname"];
                    userLinks[userSource[user]] = data[user]["username"];
                }
                return userSource;
            });
            posting.fail(function(){
                console.log("ajax-search.js: posting fail/error");
            });
            return userSource;
        },
        minLength: 2
    }
    );

    //myForm.submit(function() {
    $('#userSearch').submit(function(event){
        // Ta bort boxen med information varje gång
        //$( ".result" ).html( "" );

        // Stop form from submitting normally
        event.preventDefault();


        // Get some values from elements on the page:
        var $form = $( this ),
            name = $form.find("input[name='search']").val(),
            url = "/friend?user=";

        for (var u in userSource){
            if (name === userSource[u]){
                // get friend + user ID
                console.log("ajax-search.js, userLinks[name]: " + userLinks[name]);
                url += userLinks[name];
                window.location = url;
            }
            else{
                //TODO: felmeddelande
                console.log("ajax.search.js, could not find user");
            }
        }

        console.log("ajax-search.js: searching for: " + name);
        // url += "=" + friendid

        console.log("ajax-register.js: getting friend: " + url);

        window.location = url; // Redirect till signin


    }); // .submit

});