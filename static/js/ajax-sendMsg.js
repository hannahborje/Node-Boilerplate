/*
 Funktioner för att skriva meddelanden på väggar
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {
     $('#write-msg').click(function(event){

         event.preventDefault();

         var message = $('#send-msg').val();
         var receiver = $('.username').text();

        // post-request
        var posting = $.post( "/sendMsg", {message : message, receiver: receiver });

        // Visa resultat
        posting.done(function( data ) {
            // Stäng rutan
            $('#close-msg').click();
        });

        posting.fail(function(){
            console.log("ajax-sendMsg.js: posting fail/error");
            // Stäng rutan
            $('#close-msg').click();
        });
    });
    // Stäng medelanderutan om man trycker "släng"
    $('#dispose-msg').click(function(event){
        $('#close-msg').click();
    });
});