// Vi vill stanna kvar på sidan om datan är invalid. annars skickar server.js oss vidare
$(document).ready(function() {
  console.log("register.jade: kör jQuery-script");

    //myForm.submit(function() {
    $('#userForm').submit(function(event){
      // Ta bort boxen med information varje gång
      $( ".result" ).html( "" );

      // Stop form from submitting normally
      event.preventDefault();

      if (validate()) {
        console.log("ajax-register.js: form is valid ");

        // Get some values from elements on the page:
        var $form = $( this ),
            name = $form.find( "input[name='name']" ).val(),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;

        // Send the data using post
        //var posting = $.post( url, { s: term } );
        console.log("ajax-register.js: posting to url: " + url);
        var posting =  $.post( url, {user : user, pass: pass });

        // Put the results in a div
        posting.done(function( data, textStatus ) {
            console.dir("ajax-register.js: posting done(success)" );
            console.log("ajax-register.js: textStatus = " + textStatus);
            // TODO: flusha
            $( ".result" ).html(
                "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Grattis!</strong> Registreringen lyckades! Du förs nu till inloggningssidan din jävel. <div id='data'></div>"
            ).delay( 50000 );
            window.location = "/signin"; // Redirect till signin
        });

        posting.fail(function(){
            console.log("ajax-register.js: posting fail/error");
            // TODO: flusha
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Användarnamnet upptaget. Var god försök med ett annat!<div id='data'></div>"
            );
        });
      } // if validate
    }); // .submit
}); // document.ready