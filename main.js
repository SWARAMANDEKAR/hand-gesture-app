

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log(' ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/spQShbs1c/model.json',modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1="The  prediction is "+prediction;
    var utterThis  = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function check()
{
   img = document.getElementById('captured_image');
   classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
if (error) {
    console.error(error);
}else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction = results[0].label;
    speak();
    if(results[0].label == "amazing")
    {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if(results[0].label == "victory")
    {
        document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
    if(results[0].label == "best")
    {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    
}
}