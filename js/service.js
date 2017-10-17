$(function(){
    var date = new Date(2017, 9, 21);
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);

    var clock = $('#clock-countdown').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true
    });  
})