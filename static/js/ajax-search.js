
$(document).ready(function(){

    console.log("ajax-search.jade: kör jQuery-script");


    var userDB = [{}];
    var selectedUser = "";
    var userMap = {};

    // gör en request till servern, hämta alla användardata
    console.log("ajax-search.js: getting url: getUsers");
    var getting =  $.get("/getUsers");
    getting.done(function( data, textStatus ) {
        console.dir("ajax-search.js: getting done(success)" );
        console.log("ajax-search.js: textStatus = " + textStatus);

        // data innehåller info om alla användare i databasen
        userDB = data;
        console.log("ajax-search.js: userDB[0][username] = " + userDB[0]["username"]);
    });
    getting.fail(function(){
        console.log("ajax-search.js: posting fail/error (getUsers)");
    });

    // Aktivera söktips
    $('#searchtip').tooltip('hide');

    $('.typeahead').typeahead({
        // parametern source matar typeahead med sökdata
        source: function(query, process){
            console.log("ajax-search.js, .typeahead(): userDB[0][username] = " + userDB[0]["username"]);
            var userStrings = [];

            // För varje post/användare i databasen,
            // mappa användarnamn med all info om användaren
            // och lägg till söksträng knutet till förnamn+efternamn
            $.each(userDB, function(i, user){
               var fullname = user.firstname + " " + user.lastname;
               userMap[fullname] = user.username;
               userStrings.push(fullname)
            });

            // Kör typeahead på användardata
            process(userStrings);
        },
        // updater fångar vad användaren valt i sökrutan
        // Knyter valet till rätt användarnamn i databasen
        updater: function(item) {
            selectedUser = userMap[item];
            return item;
        },
        minLength: 1 // när typeahead ska aktiveras, antal bokstäver
    }
    );

    //myForm.submit(function() {
    $('#userSearch').submit(function(event){
        // Ta bort boxen med information varje gång
        //$( ".result" ).html( "" );

        // Stop form from submitting normally
        event.preventDefault();

        //
        // Get some values from elements on the page:
        var $form = $( this ),
            soughtName = $form.find("input[name='search']").val(),
            url = "/friend?user=";

        // Har användaren valt ett av alternativen i sökrutan? Ananrs funkar det inte
        if (userMap[soughtName] != undefined){
            // get friend + user ID
            console.log("ajax-search.js, looking for userMap[soughtName]: " + userMap[soughtName]);
            url += userMap[soughtName];
            window.location = url;
        }
        else
        {
            console.log("ajax.search.js, could not find user");
            // Aktivera söktips
            $('#searchtip').tooltip('show');
        }
    }); // .submit

});