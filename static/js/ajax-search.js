
$(document).ready(function(){

    console.log("ajax-search.jade: kör jQuery-script");

    // gör en request till databasen?
    var userSource = [""];
    var userDB = [{}];
    var userLinks = {};


    $('.typeahead').typeahead({
        source: function(){
            console.log("ajax-search.js: getting url: getUsers");
            var getting =  $.get("/getUsers");

            // Put the results in a div
            getting.done(function( data, textStatus ) {
                console.dir("ajax-search.js: getting done(success)" );
                console.log("ajax-search.js: textStatus = " + textStatus);

                userDB = data;
                for (var user in data){
                    userSource[user] = data[user]["firstname"] + " " + data[user]["surname"];
                    userLinks[userSource[user]] = data[user]["username"];
                }
                return userSource;
            });
            getting.fail(function(){
                console.log("ajax-search.js: posting fail/error");
            });
            return userSource;
        },
        minLength: 2 // när typeahead ska aktiveras
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
                console.log("ajax-search.js, looking for userLinks[name]: " + userLinks[name]);
                url += userLinks[name];
                window.location = url;
                break;
            }
            //else
            {
                //TODO: felmeddelande !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! skapa div
                console.log("ajax.search.js, could not find user"); // please use the suggestions
            }
        }
    }); // .submit

});