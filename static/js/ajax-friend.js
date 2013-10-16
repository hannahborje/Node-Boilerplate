$(document).ready(function() {

    // Fetcha user-id från trädet
    var username = $('.username').text();

    // Varje gång sidan laddas (.ready()), gör följande:
    // Hämta alla key-values om vännen från mongoDB genom nedanstående asynkrona request
    $.ajax({
            url:"/updateFriend?username=" + username,
            dataType:'json',
            success:function(friendData) {
                console.log("/friend-jQuery: Fick json tillbaka: " + friendData);

                // Fyll i fälten i html-filen med rätt uppgifter om vännen
                $('#fullname').text(friendData["firstname"] + " " + friendData["lastname"]);
                $('#city').text(friendData["city"]);
                $('#age').text(friendData["age"]);
                $('#occupation').text(friendData["occupation"]);
                $('#company').text(friendData["company"]);
                $('#education').text(friendData["education"]);

                // TODO: Om man är vän, aktiveras dessa tre fält
                $('#aboutme').text(friendData["about"]);
                $('#knowledge').text(friendData["knowledge"]);
                $('#cv').text(friendData["cv"]);

            },
            error:function(req,data,err) {
                console.log("/frend-jQuery: err" + err.msg);
            }});

    // TODO: Om vi är vänner, gör knappen oklickbar och byt text

    $('#friend-request').click(function(){
        // Send the data using post
        var posting = $.post( "/addFriend", {username : username });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-signin.js: posting success/done" );
            $( ".result" ).html(
                "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> Vänförfrågan skickad!<div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });

            /*
            // TODO: ladda om rätt del med rätt info ditt mongo-CP
            console.log(document.URL);
            console.log(window.location);
            $('.thumbnails').load("/friend?user=jojje@j.com .thumbnails");
            */
        });

        posting.fail(function(){
            console.log("ajax-signin.js: posting fail/error");
            $( ".result" ).html(
                "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hoppsan!</strong> Någonting gick fel. Försök igen. <div id='data'></div>"
            ).delay(2500).fadeTo( "slow" , 1.0, function() { $(this).children().remove(); });
        });
    })
});
