const audio = document.querySelector("#audio");
const progressBar = document.querySelector("#progress-bar");
const progressContainer = document.querySelector(".progress-container");
const playButton = document.querySelector("#play-btn");



const songsArray = ['function', 'razor_bones', 'windows-on']
let songIndex = 1;
let isPlay = false;

function renderSong (song) {
  audio.src = `audio/${song}.mp3`
}
renderSong(songsArray[songIndex]);

playButton.addEventListener('click', function () {
  if (isPlay === false) {
    console.log('d');
    playAudio()
    isPlay = true;
  } else {
    console.log('h');
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
  console.log("update");
}

audio.addEventListener("timeupdate", changeProgressBar);


