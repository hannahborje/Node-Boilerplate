//function decorateButtons () {

//}
$(document).ready(function() {
    //console.log("decorateButtons, #3");
   //decorateButtons();

    //console.log("decorateButtons, #1");
    $('.remove-friend').click(function(event){
        console.log("ajax-dash: remove clicked");

        // TODO: hmmm...
        event.preventDefault();

        //fetch username
        var username = event.currentTarget.name;
        console.log("ajax-dash.js: fetching username: " + username);

        // Send the data using post
        var posting = $.post( "/removeFriend", {username : username });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-dash.js: posting success/done" );
            $( ".result" ).html(
                "<div class='alert alert-warning'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> Vän borttagen!<div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });

            // TODO: Ladda inte om hela sidan
            $('#accordion').load("/dash #accordion", function(){
                $.getScript("/js/ajax-dash.js")
                    .done(function( script, textStatus ) {
                        console.log( textStatus );
                    })
                    .fail(function( jqxhr, settings, exception ) {
                        $( "div.log" ).text( "Triggered ajaxError handler." );
                    });
            });
            //location.reload();
            //decorateButtons();
            //console.log("decorateButtons, #2");

        });

        posting.fail(function(){
            console.log("ajax-signin.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Någonting gick fel. Försök igen. <div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
    })
});
