$(function(){
    var date = new Date(2017, 9, 21);
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

    var clock = $('#clock-countdown').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true
    });

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $('#youtube-section').css({
            opacity: function() {
            var elementHeight = $(this).height();
                var temp = elementHeight - scrollTop;
                if(temp > 0) {
                    opacity = 1 - ((elementHeight - scrollTop) / elementHeight);
                }else{
                    opacity = 1;
                } 
                return opacity;

            }
        });
    });
})