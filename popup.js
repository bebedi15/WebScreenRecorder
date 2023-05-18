// Declare necessary variables
let mediaRecorder;
let chunks = [];
let startTime;
let timerInterval;

// Get DOM elements
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const qualitySelect = document.getElementById('qualitySelect');
const timer = document.getElementById('timer');


function startRecording() {
  // Set options based on quality select
  const options = {
    audio: true,
    video: {
      cursor: "screen",
      quality: qualitySelect.value
    }
  };


  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

  navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
    .then(function(stream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.start();
    });
}


function stopRecording() {

    clearInterval(timerInterval);
  

    if (mediaRecorder && mediaRecorder.state !== "inactive") {

      mediaRecorder.stop();
      saveVideo();
    }
  }
  

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = new Date(elapsedTime).toISOString().substr(11, 8);
  timer.textContent = formattedTime;
}

function saveVideo() {

    const videoBlob = new Blob(chunks, { type: 'video/webm' });
  

    const videoUrl = URL.createObjectURL(videoBlob);
  

    const downloadLink = document.createElement('a');
    downloadLink.href = videoUrl;
    downloadLink.download = 'recorded_video.webm';
  

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  

    chunks = [];
  }
  

// Add event listeners
startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
