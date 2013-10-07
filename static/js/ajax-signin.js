// Vi vill stanna kvar på sidan om datan är invalid. annars skickar server.js oss vidare
$(document).ready(function() {
    console.log("signin.jade: kör jQuery-script");

    //myForm.submit(function() {
    $('#myForm').submit(function(event){
        // Ta bort boxen med information varje gång
        $( ".result" ).html( "" );

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $( this ),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;

        // Send the data using post
        var posting = $.post( url, {user : user, pass: pass });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-signin.js: posting success/done" );
            window.location = "/dash"; // Skicka till dashboard
        });

        posting.fail(function(){
            console.log("ajax-signin.js: posting fail/error");
            // TODO: flusha
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Vi kunde fan inte logga in dig. Testa igen.<div id='data'></div>"
            );
        });
    });
});