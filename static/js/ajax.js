// Vi vill stanna kvar på sidan om datan är invalid. annars skickar server.js oss vidare
$(document).ready(function() {
    console.log("signin.jade: kör jQuery-script");
    var myForm = $('#myForm');
    //console.dir("signin.jade/jQuery-script: hittade myForm, metod: " + myForm.attr('method'));

    myForm.submit(function() {
        // Get all the forms elements and their values in one step
        //var values = myForm.serializeArray();
        //console.dir(values);

        $.ajax({
            //type: myForm.attr('method'),
            //url: myForm.attr('action'),
            //data: values,
            type: "POST",
            url: "http://localhost:8082/authorize",
            data: {'user':"perjo927@student.liu.se", 'pass':"perj"},
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
        //return false; // ??????????
    });
});