/*
 Funktioner för användar/vän-sida
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {

    // Fetcha user-id från trädet
    var username = $('.username').text();

    // Varje gång sidan laddas (.ready()), gör följande:
    // Hämta alla key-values om vännen från mongoDB genom nedanstående asynkrona request
    $.ajax({
            url:"/updateFriend?username=" + username,
            dataType:'json',
            success:function(friendData) {
                // Fyll i fälten i html-filen med rätt uppgifter om vännen
                $('#fullname').text(friendData["firstname"] + " " + friendData["lastname"]);
                $('#city').text(friendData["city"]);
                $('#age').text(friendData["age"]);
                $('#occupation').text(friendData["occupation"]);
                $('#company').text(friendData["company"]);
                $('#education').text(friendData["education"]);
            },
            error:function(req,data,err) {
                console.log("/frend-jQuery: err" + err.msg);
            }});

    function checkFriend() {
        // Hämta vägg-meddelanden
        var posting = $.post( "/friendWall", {username : username }, dataType = "json");

        // Lägg i rätt div
        posting.done(function( friendData ) {
            // Parsa datan
            var friendInbox = friendData.inbox;

            // Skapa tomt element
            var li = $('<li></li>');

            // Läs inboxen
            for (var i=0; i<friendInbox.length; ++i) {
                jQuery('<h6></h6>', {
                    id: 'msg-from',
                    text: "Från: " + friendInbox[i].from

                }).appendTo(li);

                jQuery('<p></p>', {
                    id: 'msg-text',
                    text: friendInbox[i].message
                }).appendTo(li);

                jQuery('<hr/>').appendTo(li);
            }

            // Lägg till meddelanden på väggen
            $('#inbox-list').html(li);
        });

        posting.fail(function(){
            console.log("ajax-friend.js: /friendWall, posting fail/error");
        });

        posting.always(function(){
                // Hämta meddelanden på nytt
                setTimeout(checkFriend,5000);
            });
    }
    // Anropa ovan
    checkFriend();

    // Lägg till vän
    $('#friend-request').click(function(){
        // Send the data using post
        var posting = $.post( "/addFriend", {username : username });

        // Put the results in a div
        posting.done(function( data ) {
            console.dir("ajax-signin.js: posting success/done" );
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
