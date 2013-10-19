/*
 Funktioner för navbar
 *********************
 Programmeringsklubben
 TDP013 Linköpings universitet
 http://www.ida.liu.se/~TDP013/
 2013-10 HT Läsperiod 1
 Hannah Börjesson (hanbo174), Per Jonsson (perjo927), IP2
 https://github.com/hannahborje/Node-Boilerplate
 */

$(document).ready(function() {
    // Klicka på brevboxen för att notifieringar ska försvinna
    $("#mark-as-read").click(function(event){
        console.log("ajax-markasread.js, #markasread.click()");

        event.preventDefault();

        $.get('/mark', function(){
            console.log("ajax-markasread.js, /markAsRead, get");
        }).done(function(text){
                console.log("ajax-markasread.js, /markAsRead: " + text);
            });
        // Ta oss till vår inbox
        window.location = "/dash";
    });
});