
$('#log-enable-control').change(function(e){
  if ($(this).attr("checked")) {
      $('#log-message').transition({opacity: 0.9});
      return;
  }
  $('#log-message').transition({opacity: 0});

});

function transcriptionAnalyzer (transcript){

    console.log('audio transcript: ' + transcript);

    /** Demo bulb*/
    if(transcript == "light off"){
        document.getElementById('bulb').src = 'img/OffLamp128.png';
    }
    else if(transcript == "light on"){
        document.getElementById('bulb').src = 'img/OnLamp128.png';
    }

    /** Demo video*/
    if(transcript == "play"){
        document.getElementById('video').play();
    }
    else if(transcript == "stop"){
        document.getElementById('video').pause();
        document.getElementById('video').currentTime = 0;
    }

}