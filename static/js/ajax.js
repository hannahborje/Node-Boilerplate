// Vi vill stanna kvar på sidan om datan är invalid. annars skickar server.js oss vidare
$(document).ready(function() {
    console.log("signin.jade: kör jQuery-script");
    //var myForm = $('#myForm');
    //console.dir("signin.jade/jQuery-script: hittade myForm, metod: " + myForm.attr('method'));

    //myForm.submit(function() {
    $('#myForm').submit(function(event){

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $( this ),
            user = $form.find( "input[name='email']" ).val(),
            pass = $form.find( "input[name='password']" ).val(),
            url = $form.attr( "action"),
            type = $form.attr("method") ;


        // Get all the forms elements and their values in one step
        //var values = myForm.serializeArray();
        //var values = $form.serializeArray();
        //console.dir(values);
        /*
        $.ajax({
            //type: myForm.attr('method'),
            //url: myForm.attr('action'),
            //data: values,
            type: "POST",
            //type: type,
            //url: url,
            url: "http://localhost:8082/authorize",
            data: {'user':"perjo927@student.liu.se", 'pass':"perj"},
            //data: {user : user, pass: pass },
            statusCode: {200: function(){
                console.log('signin.jade/jquery-script: got 200 from server');
                //console.log('signin.jade/jquery-script: got 200 from: ' + myForm.attr('action'));
            }},
            success: function (data) {
                console.log('signin.jade/jquery-script: AJAX .post() ok');
                console.dir(data);
            },
            error: function(req, data, err){
                console.log('signin.jade/jquery-script: AJAX .post() not ok');
                console.dir(err);
                // Uppdatera med ett felmeddelande a la bootstrap till rätt div i dokumentet
                // HÄR
            }
        }); // .post() ???????
        */
        // Send the data using post
        //var posting = $.post( url, { s: term } );
        var posting = $.post( url, {user : user, pass: pass });

        // Put the results in a div

        posting.done(function( data ) {
            console.dir("signin.jade/jquery-script: data:" + data);
            //var content = $( data ).find( "#content" );
            //$( "#result" ).empty().append( content );
        });

    });
});