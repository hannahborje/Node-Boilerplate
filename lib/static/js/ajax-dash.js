/*
 Funktioner för kontrollpanel
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {

    function check() {
        // Hämta vägg-meddelanden
        $.get('/navbar', dataType = "json")
            .done(function(data){
                // Parsa datan
                var inbox = data.inbox;
                var newMsgs = 0;

                // Skapa tomt element
                var li = $('<li></li>');

                // Läs inboxen
                for (var i=0; i<inbox.length; ++i) {
                    jQuery('<h6></h6>', {
                        id: 'msg-from',
                        text: "Från: " + inbox[i].from

                    }).appendTo(li);

                    jQuery('<p></p>', {
                        id: 'msg-text',
                        text: inbox[i].message
                    }).appendTo(li);

                    jQuery('<hr/>').appendTo(li);
                }

                // Lägg till meddelanden på väggen
                $('#inbox-list').html(li);
            })
            .always(function(){
                // Hämta meddelanden på nytt
                setTimeout(check,5000);
            });
    }
    // Anropa ovan
    check();

    // Ta bort vän
    $('.remove-friend').click(function(event){

        event.preventDefault();

        //fetcha username
        var username = event.currentTarget.name;

        // posta
        var posting = $.post( "/removeFriend", {username : username });

        // Visa resultat
        posting.done(function( data ) {
            $( ".result" ).html(
                "<div class='alert alert-warning'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> Vän borttagen!<div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });

            // Uppdatera vänlista
            $('#accordion').load("/dash #accordion", function(){
                $.getScript("/js/ajax-dash.js")
                    .done(function( script, textStatus ) {
                    })
                    .fail(function( jqxhr, settings, exception ) {
                        $( "div.log" ).text( "Triggered ajaxError handler." );
                    });
            });
        });
        posting.fail(function(){
            console.log("ajax-dash.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Någonting gick fel. Försök igen. <div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
    });
});
