/*
 Funktioner för navbar
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {
    // Uppdatera navbar
    function check() {
        $.get('/navbar', dataType = "json")
            .done(function(data){

                // Parsa datan
                var inbox = data.inbox;
                var newMsgs = 0;

                // Markera hur många meddelanden som är ölästa
                for (var i=0; i<inbox.length; ++i) {
                    // Ange hur många olästa meddelanden vi har
                    if (!inbox[i].read) { newMsgs++; }
                }
                //Notifiera
                $('#msgs').text(newMsgs); // val, html, ?
                //$('#friend-reqs').text(data); // val, html, ?

            })
            .always(function(){
                //regardless of a fail or success, call again after 10 seconds
                setTimeout(check,10000);
            });
    }

    check();
});