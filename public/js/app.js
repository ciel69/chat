$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('a[data-logout="Logout"]').click(function () {
        $('<form method=POST action=logout/>').appendTo('body').submit();
        return false;
    });

    HeightChat();
});


function HeightChat() {
    var heightWindow = $(window).height();
    var heightMenu = $('nav').height();
    $('.body_chat .message_list').height(heightWindow - heightMenu - 70);
}