$(document).ready(function() {
    $('#remove-friend').click(function(event){
        console.log("ajax-dash: remove clicked");

        event.preventDefault();

        // Send the data using post
        var posting = $.post( "/removeFriend", {username : "TODO" });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-dash.js: posting success/done" );
            $( ".result" ).html(
                "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> Vänförfrågan skickad!<div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });

        posting.fail(function(){
            console.log("ajax-signin.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Någonting gick fel. Försök igen. <div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
    })

});
