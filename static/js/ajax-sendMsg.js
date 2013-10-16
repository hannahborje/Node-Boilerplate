
$(document).ready(function() {
     $('#write-msg').click(function(event){

         event.preventDefault();

         var message = $('#send-msg').val();
         var receiver = $('.username').text();

         console.log("Message: " + message);
        // Send the data using post
        var posting = $.post( "/sendMsg", {message : message, receiver: receiver });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-sendMsg.js: posting success/done" );
            // TODO: ev. notifikation
            $('#close-msg').click();
        });

        posting.fail(function(){
            console.log("ajax-sendMsg.js: posting fail/error");
            // TODO: ev. notifikation
            $('#close-msg').click();
        });
    });
    // Stäng medelanderutan om man trycker "släng"
    $('#dispose-msg').click(function(event){
        $('#close-msg').click();
    });
});