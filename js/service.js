$(function(){
    var date = new Date(2017, 9, 30);
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

    var clock = $('#clock-countdown').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true
    });
        var a = -200;
        var num = 2;
        var oldScrollTop = 0;
        var scrollTop;
        var scrollSpeed = 5;
    $(window).scroll(function() {
        oldScrollTop = scrollTop;
        scrollTop = $(this).scrollTop();
        // set parallax
        var topParallax = $('#subscribe-bottom-section').offset().top;
        var heightOfParentParallax = $('#subscribe-bottom-section')[0].clientHeight;
        $('#subscribe-bottom-section').css('height', heightOfParentParallax);
        $('#subscribe-bottom-section .parallax').css('height', heightOfParentParallax + 200);
        if(scrollTop - topParallax > heightOfParentParallax){
            console.log('scroll du vay')
            a = 0;
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if (topParallax  - scrollTop < 200){
            a += 0;
            console.log('topParallax  - scrollTop < 200')
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if(topParallax - scrollTop > 600){
            a = -200;
            console.log('topParallax - scrollTop > 600')
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if(topParallax - scrollTop > 200 && topParallax - scrollTop < 600){
            console.log('vao 200 600')
            //if direction down
            if(scrollTop > oldScrollTop){
                console.log('down')
                if(a != 0 && a + 200/100 < 0){
                    a += 200/150;
                }else{ a = 0;}
            }else
            {
                // direction up
                console.log('up')
                a -= 200/1000;
            }
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
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

    //Handle animation
    function onScrollInit( items, trigger ) {
        items.each( function() {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-os-animation'),
                osAnimationDelay = osElement.attr('data-os-animation-delay');
            
                osElement.css({
                '-webkit-animation-delay':  osAnimationDelay,
                '-moz-animation-delay':     osAnimationDelay,
                'animation-delay':          osAnimationDelay
                });

                var osTrigger = ( trigger ) ? trigger : osElement;
                
                osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
                },{
                    triggerOnce: true,
                    offset: '75%'
                });
        });
    }

    onScrollInit( $('.os-animation') );
})