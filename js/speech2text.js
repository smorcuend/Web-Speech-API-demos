/*==========================================================================================
*
*   A Web Speech JavaScript API framework (Speech Recognition)
*   (c) Sergio Morcuende 2013
*
===========================================================================================*/

(function() {

  var speechBtn = document.getElementById('speech-btn'),
    SpeechRecognition = window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition || window.webkitSpeechRecognition || window.SpeechRecognition,
    speechTranscript = document.getElementById('speech-transcript'),
    speechLog = document.getElementById('speech-log'),
    sr, isResult = false;

  if (SpeechRecognition !== undefined) {

    sr = new SpeechRecognition();

    console.log('sr:' + sr);
    speechLog.innerText = 'SpeechRecognition object created. Ready for start the speech recognition process.';

    /** Start the speech recognition mechanism through space key or button */
    window.onkeypress = function(event) {
      if (event.which === 32) {
        sr.start(); // Space key
      }
    };

    speechBtn.addEventListener('click', function() {
      sr.start();
    });

    /* Event handler methods */
    sr.onstart = function(event) {
      speechLog.innerText = 'onstart event: ' + event;
      isResult = false;
      console.log('onstart event');
    }

    sr.onaudiostart = function(event) {
      speechBtn.setAttribute('disabled', 'disabled');
      speechLog.innerText = 'don\'t be shy, start speaking!';
      console.log('onaudiostart event');
    }
    sr.onsoundstart = function(event) {
      speechLog.innerText = 'onsoundend event: ' + event;
      console.log('onsoundstart event');
    }
    sr.onspeechstart = function(event) {
      speechLog.innerText = 'I\'m listening...';
      speechTranscript.innerText = 'Processing...';
      console.log('onspeechstart event');
      speechTranscript.style.backgroundColor = '#a56';
    }

    sr.onspeechend = function(event) {
      speechLog.innerText = '...and you stopped';
      console.log('onspeechend event');
      speechTranscript.style.backgroundColor = '#323';
    }

    sr.onsoundend = function(event) {
      speechLog.innerText = 'onsoundend event: ' + event;
      console.log('onsoundend event');
    }
    sr.onaudioend = function(event) {
      speechLog.innerText = 'onaudioend event: ' + event;
      console.log('onaudioend event');
    }

    sr.onresult = function(event) {

      console.log('onresult event');

      if (event.results.length > 0) {
        isResult = true;
        console.log('result array lenght:' + event.results.length);
        speechTranscript.innerText = event.results[0][0].transcript;

        for (var i = 0; i < event.results.length; ++i) {
          console.log('transcript result: [' + i + ']' + event.results[i][0].transcript);
        }

        transcriptionAnalyzer(event.results[0][0].transcript);

      } else {
        console.log('No results');
      }
    }

    sr.onnomatch = function(event) {
      console.log('onnomatch event');
      speechLog.innerText = 'Onnomatch event: ' + event;
    }
    sr.onerror = function(event) {
      console.log('onerror event: ' + event);
      speechLog.innerText = 'Onerror event: ' + event;
    }

    sr.onend = function(event) {

      if (!isResult) {
        speechTranscript.placeholder = 'Speech not recognised, try again!';
        speechLog.innerText = 'Speech not recognised, try again!';
        speechTranscript.innerText = 'Speech not recognised, try again!';
        speechTranscript.style.backgroundColor = null;
      } else {
        speechLog.innerText = 'Ready for the next transcription';
      }
      speechBtn.removeAttribute('disabled');
      console.log('onend event');
      sr.stop();

    }

  } else {
    alert('Your browser don\'t support Web Speech Recognition API');
  }

})();
