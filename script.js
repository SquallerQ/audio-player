const audio = document.querySelector(".audio");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");

const trackTime = document.querySelector('.max-time')
const currentTimeElement = document.querySelector('.current-time');

const playButton = document.querySelector("#play-btn");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");




const songsArray = ['function', 'razor_bones', 'windows-on']
let songIndex = 0;
let isPlay = false;

function renderSong (song) {
  audio.src = `media/audio/${song}.mp3`
}
renderSong(songsArray[songIndex]);

function prevSong () {
  songIndex = songIndex - 1;
  if (songIndex < 0) {
    songIndex = songsArray.length - 1;
  }
  renderSong(songsArray[songIndex]);
  playAudio();
}
prevButton.addEventListener("click", prevSong);
function nextSong() {
  songIndex = songIndex + 1;
  if (songIndex > songsArray.length -1) {
    songIndex = 0
  }
  renderSong(songsArray[songIndex]);
  playAudio();
}
nextButton.addEventListener('click', nextSong)
audio.addEventListener('ended', nextSong)

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
  } else {
    pauseAudio();
  }
})

function playAudio () {
  audio.play();
  playButton.classList.remove('pause')
  playButton.classList.add('play')
  isPlay = true;
}
function pauseAudio () {
  audio.pause();
  playButton.classList.add('pause')
  playButton.classList.remove('play')
  isPlay = false;
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
