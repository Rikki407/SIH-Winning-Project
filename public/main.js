//let myImage = 'public/images/demo5.jpeg';
// Tesseract.recognize(myImage)
//     .progress(function(p) {
//         console.log('progress', p);
//     })
//     .then(function(result) {
//         console.log('result', result.text);
//     });

//--------------------
// GET USER MEDIA CODE
//--------------------
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

var video;
var webcamStream;

function startWebcam() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            // constraints
            {
                video: true,
                audio: false
            },

            // successCallback
            function(localMediaStream) {
                video = document.querySelector('video');
                video.srcObject = localMediaStream;
                webcamStream = localMediaStream;
            },

            // errorCallback
            function(err) {
                console.log('The following error occured: ' + err);
            }
        );
    } else {
        console.log('getUserMedia not supported');
    }
}

function stopWebcam() {
    webcamStream.stop();
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function init() {
    // Get the canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
}

function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // $.ajax({
    //     url: '/image',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: {
    //         img: canvas.toDataURL()
    //     },
    //     cache: false,

    //     complete: function() {
    //         console.log('process complete');
    //     },
    //     success: function(data) {
    //         console.log(data);
    //         console.log('process sucess');
    //     },
    //     error: function(err) {
    //         console.log(err, 'process error');
    //     }
    // });
    document.querySelector('#screenshot').value = canvas.toDataURL();
    console.log(canvas.toDataURL());

}
