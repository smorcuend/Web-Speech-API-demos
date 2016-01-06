var logEnableControl = document.getElementById('log-enable-control');
var logMessage = document.getElementById('log-message');

logEnableControl.addEventListener('change', function(e) {
  if (this.checked) {
    logMessage.style.opacity = 0.9;
  } else {
    logMessage.style.opacity = 0;
  }
});

function transcriptionAnalyzer(transcript) {

  if (typeof transcript !== 'string') {
    return false;
  }

  console.log('audio transcript: ' + transcript);
  transcript = transcript.toLowerCase();
  /** Demo bulb*/
  if (transcript === 'light off') {
    document.getElementById('bulb').src = 'img/OffLamp128.png';
  } else if (transcript === 'light on') {
    document.getElementById('bulb').src = 'img/OnLamp128.png';
  }

  /** Demo video*/
  if (transcript == 'play') {
    document.getElementById('video').play();
  } else if (transcript === 'stop') {
    document.getElementById('video').pause();
    document.getElementById('video').currentTime = 0;
  }

}
