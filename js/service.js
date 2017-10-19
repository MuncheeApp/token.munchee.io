$(function(){
    var date = new Date(2017, 9, 21);
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

    var clock = $('#clock-countdown').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true
    });
        var a = -80;
        var num = 2;
        var oldScrollTop = 0;
        var scrollTop
    $(window).scroll(function() {
        oldScrollTop = scrollTop;
        scrollTop = $(this).scrollTop();
        if(scrollTop < oldScrollTop){}
        else if(scrollTop > $('#subscribe-bottom-section').offset().top){
            a = 0;
            $("#subscribe-bottom-section").css("background-position","center"+" "+a+"px");
        }else if(scrollTop < $('#subscribe-bottom-section').offset().top - 500 ){
            a = -80;
             $("#subscribe-bottom-section").css("background-position","center"+" "+a+"px");
        }else{
             if(a < 0){
                 a = a + (($('#subscribe-bottom-section').offset().top - scrollTop) / 5);
             }
             $("#subscribe-bottom-section").css("background-position","center"+" "+a+"px");
        }

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