$(function(){
    //var date = new Date(2017, 9, 31);
    var date = new Date("31 Oct 2017 18:08:30 GMT");
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

    var clock = $('#clock-countdown').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true
    });

    //Show pop up
    setTimeout(function(){
        $('#munchee-popup').modal('show');
    }, 3000)

    //Scroll parallax
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
            a = 0;
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if (topParallax  - scrollTop < 200){
            a += 0;
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if(topParallax - scrollTop > 600){
            a = -200;
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }
        if(topParallax - scrollTop > 200 && topParallax - scrollTop < 600){
            //if direction down
            if(scrollTop > oldScrollTop){
                if(a != 0 && a + 200/100 < 0){
                    a += 200/150;
                }else{ a = 0;}
            }else
            {
                // direction up
                a -= 200/1000;
            }
            $('#subscribe-bottom-section .parallax').css('background-position', 'center '+ a+ 'px');
        }

        $('#youtube-section').css({
            opacity: function() {
            var elementHeight = $('#munchee-youtube').height();
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
                    offset: '80%'
                });
        });
    }

    onScrollInit( $('.os-animation') );

    //Handle menu scroll to div
    $("#menu-home .nav-link, #menu-mobile-left .nav-link").click(function(e) {
        e.stopPropagation()
        var des = ($(this)[0].getAttribute('data-target'));
        if (des){
            $('html, body').animate({
                scrollTop: $('#'+des).offset().top - $('#top-nav')[0].clientHeight
            }, 1000);
        }
    });

    $("#whitepaper-btn").click(function(e) {
        e.stopPropagation()
        var des = $('.whitepaper-list')[0];
        console.log(des)
        if (des){
            $('html, body').animate({
                scrollTop: $(des).offset().top - 100 - $('#top-nav')[0].clientHeight
            }, 1000);
        }
    });

    // show menu mobile 
    $("#menu-mobile-btn").on("click", function(e) {
        e.stopPropagation();
        var $elm = $("#main");
        if($("#menu-mobile-btn").hasClass('close-active')){
        $("#menu-mobile-btn").removeClass('close-active');
        $('#menu-mobile-left').attr('style','');
        //$('#menu-mobile-left').removeClass('slideout');
        $('html').attr('style','');
        $('body').attr('style','');
        }else{
        $("#menu-mobile-btn").addClass('close-active');
        
        //$('#menu-mobile-left').addClass('slideout');
            //$('html').attr('style','overflow:hidden; height: 100%;');
            //$('body').attr('style','overflow:hidden; height: 100%;');
            $('#menu-mobile-left').attr('style','transform: translate3d(0, 0px, 0px);');
        }
    });
    $('#menu-mobile-btn').click(function(){
		$(this).toggleClass('open');
	});

        
    $('#subscribe-popup-btn, #subscribe-button, #subscribe-bottom-btn').click(function(e){
        e.stopPropagation();
        var self = this;
        var field = $(self).parent().find('input');
        var parentLevel2 = $(self).parent().parent();
        console.log(field.val())
        $.ajax({
            url: "/subscribe",
            type: 'POST',
            data: {
                email: field.val(),
            },
            success: function (data) {
                console.log(data)
                $(self).parent().replaceWith("<p class='notification fade' >"+data.message+"</p>");
                setTimeout(function(){
                    parentLevel2.find('.notification').addClass('show');
                },200)
            },
            error: function (error) {
                console.log(error)        
                $(self).parent().replaceWith("<p class='notification fade' >"+error.responseJSON.message+"</p>");
                setTimeout(function(){
                    parentLevel2.find('.notification').addClass('show');
                },200)
            }
        });
        return false;
        
    })

})