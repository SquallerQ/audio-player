const audio = document.querySelector("#audio");
const progressBar = document.querySelector("#progress-bar");
const progressContainer = document.querySelector(".progress-container");
const playButton = document.querySelector("#play-btn");
const trackTime = document.querySelector('.max-time')
const currentTimeElement = document.querySelector('.current-time');



const songsArray = ['function', 'razor_bones', 'windows-on']
let songIndex = 0;
let isPlay = false;

function renderSong (song) {
  audio.src = `audio/${song}.mp3`
}
renderSong(songsArray[songIndex]);


function correctTime(seconds) {
  const minutes = Math.floor(seconds / 60); 
  const secs = Math.floor(seconds % 60);
  if (secs < 10) {
    return minutes + ":0" + secs;
  } else {
    return minutes + ":" + secs;
  }
}


playButton.addEventListener('click', function () {
  if (isPlay === false) {
    playAudio()
    isPlay = true;
  } else {
    pauseAudio();
    isPlay = false;
  }
})

function playAudio () {
  audio.play();
  playButton.classList.remove('pause')
  playButton.classList.add('play')
}
function pauseAudio () {
  audio.pause();
  playButton.classList.add('pause')
  playButton.classList.remove('play')
}

function changeProgressBar (e) {
  const duration = e.srcElement.duration;
  const currentTime = e.srcElement.currentTime;
   if (!isNaN(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  currentTimeElement.textContent = correctTime(currentTime);
}

function changeProgressBarAfterClick(e) {
  const progressBarWidth = this.clientWidth;
  const clientClick = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientClick / progressBarWidth) * duration;
}

audio.addEventListener("timeupdate", changeProgressBar);
progressContainer.addEventListener("click", changeProgressBarAfterClick);

audio.addEventListener("loadedmetadata", function () {
  trackTime.textContent = correctTime(audio.duration);
});
