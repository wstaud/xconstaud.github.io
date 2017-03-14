$(document).ready (function() {
    "use strict";

//SVG Icon Fetch. This gives ability to change icon attributes within CSS
jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});

//Button Liteners

$("#siteRepoBtn").click(function() {
    window.open("https://github.com/xconstaud/xconstaud.github.io", "_blank");
});
$("#lcarsRepoBtn").click(function() {
    window.open("https://github.com/xconstaud/Simple-Simon", "_blank");
});
$("#lcarsBtn").click(function() {
    window.open("/projects/lcars/index.html", "_blank");
});
$("#calcRepoBtn").click(function() {
    window.open("https://github.com/xconstaud/Codeup-Web-Exercises/tree/master/public", "_blank");
});
$("#calcBtn").click(function() {
    window.open("/projects/calculator/calculator.html", "_blank");
});
//Buttons between LCARS and Exercises here!
$("#exercisesRepoBtn").click(function() {
    window.open("https://github.com/xconstaud/Codeup-Web-Exercises", "_blank");
});
$("#githubRepoBtn").click(function() {
    window.open("https://github.com/xconstaud", "_blank");
});

$(".mobileNav").on("click", function(){
    $(".nav").toggleClass("open");
});


});