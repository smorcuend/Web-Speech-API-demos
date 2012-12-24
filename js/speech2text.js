(function (window, undefined) {

    var speechBtn = document.getElementById('speech-btn'),
        SpeechRecognition = window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition || window.webkitSpeechRecognition || window.SpeechRecognition,
        speechTranscript = document.getElementById('speech-transcript'),
        speechLog = document.getElementById('speech-log'),
        sr,isResult = false;

    if ( SpeechRecognition !== undefined ) {

        sr = new SpeechRecognition();
        console.log('sr:' + sr);

        speechBtn.addEventListener('click', function () {
            //console.log(sr);
            sr.start();
        });


        $(window).keypress(function(event) {
            if( event.which == 32 ){
                sr.start();
                event.preventDefault();
            }
            console.log('space key pushed');
            
        });

        speechBtn.addEventListener('click', function () {
            sr.start();
        });

        sr.onstart = function (event) {
            isResult = false;
            console.log('onstart event');
        }

        sr.onaudiostart = function (event) {
            speechBtn.setAttribute('disabled', 'disabled');
            speechLog.innerText = "don't be shy, start speaking!";
            console.log('onaudiostart event');
        }
        sr.onsoundstart = function (event) {
            console.log('onsoundstart event');   
        }
        sr.onspeechstart = function (event) {
            speechLog.innerText = "I'm listening...";
            speechTranscript.value = 'Processing...';
            console.log('onspeechstart event');
            speechTranscript.style.backgroundColor = '#a56';
        }

        sr.onspeechend = function (event) {
            speechLog.innerText = '...and you stopped';
            console.log('onspeechend event');
            speechTranscript.style.backgroundColor = '#323';
        }

        sr.onsoundend = function (event) {
            console.log('onsoundend event');   
        }
        sr.onaudioend = function (event) {
            console.log('onaudioend event');
        }
        
        sr.onresult = function (event) {
            
            console.log('onresult event');

            if (event.result.length > 0) {
                isResult = true;
                console.log('result array lenght:'+ event.result.length);
                speechTranscript.value = event.result[0].transcript;
                
                for (var i = 0; i < event.result.length; ++i) {
                    console.log('transcript result: ['+i+']' + event.result[i].transcript);
                }

                transcriptionAnalyzer(event.result[0].transcript);

            }else{
                console.log('No results');
            }
        }

        sr.onnomatch = function (event) {
            console.log('onnomatch event');   
        }
        sr.onerror = function (event) {
            console.log('onerror event: '+event);
        }

        sr.onend = function (event) {

            if (!isResult) {
                speechTranscript.placeholder = "Speech not recognised, try again!";
                speechLog.innerText = 'Speech not recognised, try again!';
                speechTranscript.value = '';
            }else{
                speechLog.innerText = 'Ready for the next transcription';
            }
            speechBtn.removeAttribute('disabled');
            console.log('onend event');
            sr.stop();

        }

    }


})(window);