
function play() {
    loadMedia('juanzulian.mp3');
    document.getElementById("#html5audio").play();
    var play = document.getElementById("play");
    var pause = document.getElementById("pause");
    play.style.display = "none";
    pause.style.display = "block";
};

function pause() {
    document.getElementById("#html5audio").pause();
    var play = document.getElementById("play");
    var pause = document.getElementById("pause");
    play.style.display = "block";
    pause.style.display = "none";
};

function loadMedia(src) {
    var mediaEm = document.getElementById("#html5audio");
    mediaEm.setAttribute('src', src);
    //var seconds = mediaEm.duration;
    var seconds = 173;
    var h = '00';
    var m = '00';
    if(seconds > 3600)
        h = parseInt(seconds / 3600);
        h = (h>9) ? h : '0'+h;
    if(seconds % 3600 > 60)
        m = parseInt(seconds % 3600 / 60);
        m = (m>9) ? m : '0'+m;
    var s = seconds % 3600 % 60;
    s = (s>9) ? s : '0'+s;
    var duration_label = document.getElementById("duration");
    duration_label.innerHTML = h + ':' + m + ':' + s;
};
