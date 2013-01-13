/*=====================================================
*
*   A Web Speech JavaScript API framework (Text2Speech)
*   (c) Sergio Morcuende 2013
*
======================================================*/

(function (window, undefined) {

    var speechBtn = document.getElementById('speech-btn'),
        speechSynthesis = window.mozSpeechSynthesis || window.msSpeechSynthesis || window.oSpeechSynthesis || window.webkitSpeechSynthesis || window.SpeechSynthesis,
        text2speech = document.getElementById('speech-synthesis'),
        speechLog = document.getElementById('speech-log'),
        ss,isResult = false;

    if ( speechSynthesis != undefined ) {

        ss = new speechSynthesis();
        console.log('ss:' + ss);

        //TODO
        speechBtn.addEventListener('click', function (event) {
            //ss.speak(SpeechSynthesisUtterance utterance);
            var u = new SpeechSynthesisUtterance();
            u.text = text2speech.value;
            u.lang = 'en-US';
            u.rate = 1;
            u.onend = function(event) { alert('Finished in ' + event.elapsedTime + ' seconds.'); }
            speechSynthesis.speak(u);
        });

        $(window).keypress(function(event) {
            if( event.which == 32 ){
                
            }        
        });

    }else{
        alert('Your browser don\'t support Web Speech Synthesis API');
    }


})(window);