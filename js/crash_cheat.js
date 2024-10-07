var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/joke.ico");
        document.title = '快回来喵~TAT';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/favicon.ico");
        document.title = '来啦喵~';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
