
var validate = function() {
 var form = $("#userForm");
 form.validate({
    rules: {
        firstname: {
            required: true,
            minlength: 2
        },
        lastname: {
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
        firstname: {
            required: "Var vänlig uppge ditt förnnamn"
        },
        lastname: {
            required: "Var vänlig uppge ditt efternnamn"
        },
        email: {
            required: "Din e-postadress behövs som ditt användarnamn",
            email: "Din e-postadress måste skrivas i formatet name@domain.com"
        },
        password: {
            required: "Var god ange ett lösenord"
        },
        confirm: {
            required: "Var god bekräfta lösenordet"
        }
    }
 });
    return form.valid();
};