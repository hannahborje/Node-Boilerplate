
var validate = function() {
 console.log("validate.js(): anropad");

 var form = $("#userForm");

 form.validate({
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 4
        },
        confirm: {
            required: true,
            minlength: 4,
            equalTo: "#password"
        }
    },
    messages: {
        name: {
            required: "Please specify your name"
        },
        email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
        },
        password: {
            required: "Please enter password"
        },
        confirm: {
            required: "Please confirm password"
        }
    }
 });
    //console.log("Validate.js(): is form.valid()? " + form.valid());
    return form.valid();
};