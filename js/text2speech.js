/*===============================================================================
*
*   A Web Speech JavaScript API framework (Text2Speech)
*   (c) Sergio Morcuende 2013
*
=================================================================================*/

(function() {

  var speechBtn = document.getElementById('speech-btn'),
    speechSynthesis = window.mozSpeechSynthesis || window.msSpeechSynthesis || window.oSpeechSynthesis || window.webkitSpeechSynthesis || window.speechSynthesis,
    text2speech = document.getElementById('speech-synthesis'),
    ss, isResult = false;

  var inputForm = document.querySelector('form');
  var inputTxt = document.querySelector('.txt');
  var voiceSelect = document.querySelector('select');

  var pitch = document.querySelector('#pitch');
  var pitchValue = document.querySelector('.pitch-value');
  var rate = document.querySelector('#rate');
  var rateValue = document.querySelector('.rate-value');

  var voices = [];

  if (speechSynthesis !== undefined) {

    function populateVoiceList() {
      voices = speechSynthesis.getVoices();

      for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    pitch.onchange = function() {
      pitchValue.textContent = pitch.value;
    }

    rate.onchange = function() {
      rateValue.textContent = rate.value;
    }

    function start(text, params) {

      var utterThis = new SpeechSynthesisUtterance(text);
      utterThis.pitch = params.pitch || 1;
      utterThis.rate = params.rate || 1;
      utterThis.voice = params.voice || 'English';
      speechSynthesis.speak(utterThis);

      utterThis.onend = function(event) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
      }
      utterThis.onpause = function(event) {
        var char = event.utterance.text.charAt(event.charIndex);
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
          event.utterance.text + '", which is "' + char + '".');
      };

    };

    inputForm.onsubmit = function(event) {
      event.preventDefault();

      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      var params = {
        voice: null,
        rate: rate.value,
        pitch: pitch.value
      };

      for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          params.voice = voices[i];
        }
      }

      start(text2speech.value, params);

      text2speech.blur();
      return false;
    }

  } else {
    alert('Your browser don\'t support Web Speech Synthesis API');
  }

})();
