// Vi vill stanna kvar på sidan om datan är invalid. annars skickar server.js oss vidare
$(document).ready(function() {
  console.log("register.jade: kör jQuery-script");

    //myForm.submit(function() {
    $('#userForm').submit(function(event){


      // Stop form from submitting normally
      event.preventDefault();

      if (validate()) {
        console.log("ajax-register.js: form is valid ");

        // Get some values from elements on the page:
        var $form = $( this ),
            firstname = $form.find( "input[name='firstname']" ).val(),
            lastname = $form.find( "input[name='lastname']" ).val(),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;

        // Send the data using post
        console.log("ajax-register.js: posting to url: " + url);
        var posting =  $.post( url, {firstname: firstname, lastname: lastname, user : user, pass: pass });

        // Put the results in a div
        posting.done(function( data, textStatus ) {
            console.dir("ajax-register.js: posting done(success)" );
            console.log("ajax-register.js: textStatus = " + textStatus);

            $( ".result" ).html(
                "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Grattis!</strong> Registreringen lyckades! Du förs nu till inloggningssidan. <div id='data'></div>"
            ).delay( 3000 );
            window.location = "/signin"; // Redirect till signin
        });

        posting.fail(function(){
            console.log("ajax-register.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Användarnamnet upptaget. Var god försök med ett annat.<div id='data'></div>"
            ).delay(2000).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
      } // if validate
    }); // .submit
}); // document.ready