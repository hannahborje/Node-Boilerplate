/*
 Funktioner för sökning
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function(){
    // Behållare att spara resultat i
    var userDB = [{}];
    var selectedUser = "";
    var userMap = {};

    // gör en request till servern, hämta alla användardata
    var getting =  $.get("/getUsers");

    getting.done(function( data, textStatus ) {
        // data innehåller info om alla användare i databasen
        userDB = data;
    });
    getting.fail(function(){
        console.log("ajax-search.js: getting fail/error (getUsers)");
    });

    // Aktivera söktips
    $('#searchtip').tooltip('hide');

    // Sökförslag
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

    // Sök-knappen tryckt
    $('#userSearch').submit(function(event){
        event.preventDefault();

        // Fånga info från trädet
        var $form = $( this ),
            soughtName = $form.find("input[name='search']").val(),
            url = "/friend?user=";

        // Har användaren valt ett av alternativen i sökrutan? Ananrs funkar det inte
        if (userMap[soughtName] != undefined){
            url += userMap[soughtName];
            window.location = url;
        } else  {
            // Aktivera söktips
            $('#searchtip').tooltip('show');
        }
    });
});