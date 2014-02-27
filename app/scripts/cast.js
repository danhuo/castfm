var currentMediaSession = null;
var currentVolume = 0.5;
var progressFlag = 1;
var mediaCurrentTime = 0;
var session = null;

if(!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}

function initializeCastApi() {
  var applicationID = chrome.cast.media.;
  var sessionRequest = new.chrome.cast.SessionRequest(applicationID);
  var apiConfig = new.chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

function onInitSuccess() {
  appendMessage.log("init success");
};

function onError() {
  console.log("error");
  appendMessage("error");
};

function onSuccess(message) {
  console.log(message);
};

function onStopAppSuccess() {
  console.log('Session stopped');
  appendMessage('Session stopped');
  document.getElementById("casticonactive").style.display = 'block;';
  document.getElementById("casticonidle").style.display = 'none;';
};

function sessionListener(e, mediaURL) {
  console.log('New session ID: ' + e.sessionId);
  appendMessage('New session ID: ' + e.sessionId);
  session = e;
  if (session.media.length != 0 ) {
    appendMessage('Found ' + session.media.length + ' existing media sessions.');
    onMediaDiscovered('onRequestSessionSuccess_', mediaURL);
  }
  session.addMediaListener(onMediaDiscovered.bind(this, 'addMediaListener'));
  session.addUpdateListener(sessionUpdateListener.bind(this));
};

function sessionUpdateListener(isAlive) {
  var message = isAlive ? 'Session Updated' : 'Session Removed';
  message += ':' + session.sessionId;
  appendMessage(message);
  if(!isAlive) {
    session = null;
    document.getElementById("casticonactive").style.display = 'block;';
    document.getElementById("casticonidle").style.display = 'none;';
    var play = document.getElementById("play");
    var pause = document.getElementById("pause");
    play.style.display = 'block;';
    pause.style.display = 'none;';
  }
};

function receiverListener(e) {
  if(e === 'available') {
    console.log('receiver found');
    appendMessage('receiver found');
  }
  else {
    console.log('receiver list empty');
    appendMessage('receiver list empty');
  }
};

function launchApp(mediaURL, currentTime, contentType, title, thumb) {
  console.log('launching app...');
  appendMessage('launching app...');
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
  loadMedia(mediaURL, currentTime, contentType, title, thumb);
};

function onRequestSessionSuccess(e) {
  console.log('session success: ' + e.sessionId);
  appendMessage('session success: ' + e.sessionId);
  session = e;
  document.getElementById("casticonactive").style.display = 'none;';
  document.getElementById("casticonidle").style.display = 'block;';
  session.addUpdateListener(sessionUpdateListener.bind(this));
};

function onLaunchError() {
  console.log('launch error');
  appendMessage('launch error');
};

function stopApp() {
  session.stop(onStopSuccess, onError);
};

function loadMedia(mediaURL, currentTime, contentType, title, thumb) {
  if(!session) {
    console.log('no session');
    appendMessage('no session');
    return;
  }
  console.log('loading...' + mediaURL);
  appendMessage('loading...' + mediaURL);
  var mediaInfo = new chrome.cast.MediaInfo(mediaURL);
  mediaInfo.contentType = contentType;
  var request = new chrome.cast.media.loadRequest(mediaInfo);
  request.autoplay = true;
  request.currentTime = currentTime;
  
  var payload = {
    "title" : title,
    "thumb" : thumb
  };

  var jason = {
    "payload" : payload
  };

  request.customData = jason;

  session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
};

function onMediaDiscovered(how, mediaSession) {
  console.log('new media session ID: ' + mediaSession.mediaSessionId);
  appendMessage('new media session ID: ' + mediaSession.mediaSessionId);
  currentMediaSession = mediaSession;
  mediaSession.addUpdateListener(onMediaStatusUpdate);
  mediaCurrentTime = currentMediaSession.currentTime;
  play.style.display = 'none;';
  pause.style.display = 'block;';
  document.getElementById("casticonactive").style.display = 'none;';
  document.getElementById("casticonidle").style.display = 'block;';
};

function onMediaError() {
  console.log('media error');
  appendMessage('media error');
};

function onMediaStatusUpdate(isAlive) {
  if(progressFlag) {
    document.getElementById("progress").value = parseInt(100 * currentMediaSession.currentTime / currentMediaSession.media.duration);
  }
};

function playMedia() {
  if(!currentMediaSession)
    return;

  var play = document.getElementById("play");
  var pause = document.getElementById("pause");
  if((play.style.display == 'block;') && (pause.style.display == 'none;') {
    currentMediaSession.play(null, mediaCommandSuccessCallback.bind(this, "playing started for " + currentMediaSession.sessionId), onError);
    play.style.display == 'none;';
    pause.style.display == 'block;';
    appendMessage('play started');
  }
  else if ((play.style.display == 'none;') && (pause.style.display == 'block;') {
    currentMediaSession.pause(null, mediaCommandSuccessCallback.bind(this, "paused " + currentMediaSession.sessionId), onError);
    play.style.display == 'block;';
    pause.style.display == 'none;';
    appendMessage('paused');
  }
  else {
    console.log('wrong playpause status');
    appendMessage('wrong playpause status');
    return;
  }
};

function stopMedia() {
  if(!currentMediaSession)
    return;

  currentMediaSession.stop(null, mediaCommandSuccessCallback.bind(this, "stopped " + currentMediaSession.sessionId), onError);
  var play = document.getElementById("play");
  var pause = document.getElementById("pause");
  play.style.display == 'block;';
  pause.style.display == 'none;';
  appendMessage('media stopped');
};

function setReceiverVolume(level) {
  if(!session)
    return;

  session.setReceiverVolumeLevel(level, mediaCommandSuccessCallback.bind(this, 'media set-volume done'), onError);
  currentVolume = level;
};

function mediaCommandSuccessCallback(info) {
  console.log(info);
  appendMessage(info);
};

function appendMessage(message) {
  var dw = document.getElementById("debugmessage");
  dw.innerHTML += '\n' + JSON.stringify(message);
};
