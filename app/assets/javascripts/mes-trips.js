// je cache les menus
$('#sub-title liste-ny').css("display","none");
$('#liste-paris').css("display","none");
// je les fais apparaître

$('#nav-link dropdown-toggle trip-ny').click(function(){
    $('#sub-title liste-ny').toggle();
});

$('#trip-paris').click(function(){
    $('#liste-paris').toggle();
});