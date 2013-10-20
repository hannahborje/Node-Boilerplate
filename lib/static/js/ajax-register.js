/*
 Funktioner för registrering
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {

    $('#userForm').submit(function(event){

      event.preventDefault();

      if (validate()) {
        // Fånga input
        var $form = $( this ),
            firstname = $form.find( "input[name='firstname']" ).val(),
            lastname = $form.find( "input[name='lastname']" ).val(),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;

        // Skicka
        var posting =  $.post( url, {firstname: firstname, lastname: lastname, user : user, pass: pass });

        // Gå till inlogg
        posting.done(function( data, textStatus ) {
            $( ".result" ).html(
                "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Grattis!</strong> Registreringen lyckades! Du förs nu till inloggningssidan. <div id='data'></div>"
            ).delay( 3000 );
            window.location = "/signin"; // Redirect till signin
        });

        // Stanna kvar
        posting.fail(function(){
            console.log("ajax-register.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Användarnamnet upptaget. Var god försök med ett annat.<div id='data'></div>"
            ).delay(2000).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
      } // if validate
    }); // .submit
}); // document.ready