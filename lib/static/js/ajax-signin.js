/*
 Funktioner för inloggning
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {
    $('#myForm').submit(function(event){

        // Vill hindra övertagande av server.js
        event.preventDefault();

        // Hämta värden
        var $form = $( this ),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;

        // Skicka post-request
        var posting = $.post( url, {user : user, pass: pass });

        // Visa resultat
        posting.done(function( data ) {
            window.location = "/dash"; // Skicka till dashboard
        });

        posting.fail(function(){
            console.log("ajax-signin.js: posting fail/error");

            // Aktivera logintips
            $('#signin-error').tooltip('show');
        });
    });

    // Ta bort popupfönster
    $(".signin-tip").mouseenter(function(){
        $('#signin-error').tooltip('hide');
    });

});