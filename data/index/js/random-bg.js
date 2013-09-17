var g_background;

$(function() {
    var path;
    var	n;
    var url;

    path = 'index/img/';
    n = Math.floor(Math.random() * N_BG + 1);
    url = 'url(\'' + path + n + '.jpg\')';
    g_background = n;
    $('body').css('background-image', url);
});