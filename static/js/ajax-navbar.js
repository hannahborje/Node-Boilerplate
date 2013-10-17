$(document).ready(function check() {
    //a GET AJAX call
    console.log("Kör ajax-navbar.js");

    $.get('/navbar', dataType = "json")
        .done(function(data){
            console.log("ajax-navbar.js, .done");

            // Parsa datan
            var inbox = data.inbox;
            var newMsgs = 0;
            console.log("ajax-navbar.js, .done, inbox: " + inbox);

            var li = $('<li></li>');

            // TODO: .each()?
            for (var i=0; i<inbox.length; ++i) {


                jQuery('<h6></h6>', {
                    id: 'msg-from',
                    text: inbox[i].from

                }).appendTo(li);

                jQuery('<p></p>', {
                    id: 'msg-text',
                    text: inbox[i].message
                }).appendTo(li);

                jQuery('<hr/>').appendTo(li);

                // Ange hur många olästa meddelanden vi har
                if (!inbox[i].read) { newMsgs++; }
            }

            $('#inbox-list').html(li);

            //when we receive, populate
            $('#msgs').text(newMsgs); // val, html, ?
            //$('#friend-reqs').text(data); // val, html, ?

        })
        .always(function(){
            console.log("ajax-navbar.js, .always");
            //regardless of a fail or success, call again after 10 seconds
            setTimeout(check,10000);
        });

    $("#mark-as-read").click(function(event){

        console.log("ajax-navbar.js, #markasread.click()");

        $.post("/markAsRead")
            .done(function(text){
                console.log("ajax-navbar.js, /markAsRead: " + text);
            });
    });
});