var timer;

function play() {
    var duration = document.getElementById("html5audio").duration;
    if(!duration) {
        duration = 173;
        load('juanzulian.mp3', duration);
    }
    document.getElementById("html5audio").play();
    $("#play").hide();
    $("#pause").show();
    var rate = 0.955555 / duration;
    timer = setInterval(function(){keepPrgress(rate)}, 1000);
};

function pause() {
    document.getElementById("html5audio").pause();
    if(null!=timer) {
        clearInterval(timer);
        timer = null;
    }
    $("#pause").hide();
    $("#play").show();
};

function load(src, duration) {
    $("#html5audio").attr('src', src);
    var h = '00';
    var m = '00';
    if(duration > 3600) {
        h = parseInt(duration / 3600);
        h = (h>9) ? h : '0'+h;
    }
    if(duration % 3600 > 60) {
        m = parseInt(duration % 3600 / 60);
        m = (m>9) ? m : '0'+m;
    }
    var s = duration % 3600 % 60;
    s = (s>9) ? s : '0'+s;
    $("#duration").html(h + ':' + m + ':' + s);
};

function keepPrgress(rate) {
    var in_all = 160;
    var current_width = $("#progress_indicator").width();
    var detal = Math.round(in_all * rate);
    if(detal < 1)
        detal = 1;
    var width = current_width + detal;
    if(width > (in_all + 20)) {
        clearInterval(timer);
        $("#progress_indicator").width(6);
        $("#pause").hide();
        $("#play").show();
        playNext();
    }
    else
        $("#progress_indicator").width(width);
};

function playNext(){
    play();
};
