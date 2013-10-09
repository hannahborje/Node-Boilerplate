/**
 * Created by perjo927 on 2013-10-02.
 */

$(document).ready(function() {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';

    //make username editable
    $('#name').editable({
        pk: 'name',
        success: function(data){
            console.log("editable.js: Det här gick ju bra:" + data.msg)
        },
        error: function(err){
            console.log("Det här blev fel: " + err.status);
    }
    });
    $('#surname').editable();
    $('#city').editable();
    $('#occupation').editable();
    $('#company').editable();
    $('#education').editable();
    $('#aboutme').editable();
    $('#knowledge').editable();
    $('#cv').editable();

    //make status editable
    $('#age').editable({
        /*
        // + ajaxOptions?
         //uncomment these lines to send data on server
         ,pk: 1
         ,url: '/post'
         ,id ....
         */
    });
});