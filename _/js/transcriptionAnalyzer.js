    function transcriptionAnalyzer (transcript){

        console.log('audio transcript: ' + transcript);

        /** Demo bulb*/
        if(transcript == "light off"){
            document.getElementById('bulb').src = '_/img/OffLamp128.png';
        }
        else if(transcript == "light on"){
            document.getElementById('bulb').src = '_/img/OnLamp128.png';
        }

        /** Demo video*/
        if(transcript == "play"){
            document.getElementById('video').play();
        }
        else if(transcript == "stop"){
            document.getElementById('video').pause().currentTime(0);
            
        }

    }