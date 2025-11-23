const audio = document.querySelector(".audio");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");

const trackTime = document.querySelector('.max-time')
const currentTimeElement = document.querySelector('.current-time');

const playButton = document.querySelector("#play-btn");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

const songImage = document.querySelector('.image')
const artistName = document.querySelector('.artist-name')
const trackName = document.querySelector('.track-name')

const FIRST_SONG_INDEX = 0;

const songsArray = [
  { song: "6 Senz - Function.mp3", img: '6_senz.jpg', artist: '6 Senz', track: 'Function', duration: '03:45'},
  { song: "Spvrrow - Space Odyssey.mp3", img: 'sparrow.jpg', artist: 'Spvrrow', track: 'Space Odyssey', duration: '02:41'},
  { song: "Sxlect - Full Send.mp3", img: 'sxlect.jpg', artist: 'Sxlect', track: 'Full Send', duration: '02:27'},
  { song: "Lxst Cxntury - Deep Fusion.mp3", img: 'lxst.webp', artist: 'Lxst Cxntury', track: 'Deep Fusion', duration: '03:26'},
];

const LAST_SONG_INDEX = songsArray.length - 1;

let songIndex = 0;
let isPlaying = false;

function renderSong (index) {
  audio.src = `media/audio/${index.song}`;
  songImage.src = `media/img/${index.img}`;
  artistName.innerHTML = index.artist
  trackName.innerHTML = index.track;
}
renderSong(songsArray[songIndex]);

function prevSong () {
  progressBar.value = 0;
  songIndex = songIndex - 1;
  if (songIndex < FIRST_SONG_INDEX) {
    songIndex = LAST_SONG_INDEX;
  }
  renderSong(songsArray[songIndex]);
  if (isPlaying === true) {
    playAudio();
  } else {
    activeSongInPlaylist(songIndex);
  }
}
prevButton.addEventListener("click", function () {
  prevSong()
});

function nextSong() {
  progressBar.value = 0;
  songIndex = songIndex + 1;
  if (songIndex > LAST_SONG_INDEX) {
    songIndex = FIRST_SONG_INDEX
  }
  renderSong(songsArray[songIndex]);
  if (isPlaying === true) {
    playAudio();
  } else {
    activeSongInPlaylist(songIndex);
  }
}
nextButton.addEventListener('click', function () {
  nextSong()
})

audio.addEventListener('ended', nextSong)

audio.addEventListener('error', function() {
  console.error("Error loading audio file");
  nextSong();
});

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
  if (isPlaying === false) {
    playAudio()
  } else {
    pauseAudio();
  }
})

function playAudio () {
  audio.play();
  playButton.classList.remove('pause')
  playButton.classList.add('play')
  isPlaying = true;
  activeSongInPlaylist(songIndex)
}
function pauseAudio () {
  audio.pause();
  playButton.classList.add('pause')
  playButton.classList.remove('play')
  isPlaying = false;
}

function changeProgressBar (e) {
  const duration = e.srcElement.duration;
  const currentTime = e.srcElement.currentTime;
   if (!isNaN(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = `${progressPercent}`;
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


const playlist = document.querySelector(".playlist__items");

function renderPlaylist (array) {
  for (let i = 0; i < array.length; i++) {
    const item = document.createElement("div");
    item.classList.add("playlist__item");
    item.innerHTML = `<div class="playlist__item-info">
              <img class="playlist__item-img" src="media/img/${array[i].img}" alt="song image">
              <span>${i + 1}.<span>
              <span>${array[i].artist}</span> - 
              <span>${array[i].track}</span>
            </div>
            <div class="playlist__item-duration">
              ${array[i].duration}
            </div>`;
    playlist.append(item); 
  }
}
renderPlaylist(songsArray);

function activeSongInPlaylist (songIndex) {
  const allSongsAtPlaylist = document.querySelectorAll('.playlist__item');
  allSongsAtPlaylist.forEach(item => {
    item.classList.remove('playlist__item--active')
  });
  allSongsAtPlaylist[songIndex].classList.add('playlist__item--active')
}
activeSongInPlaylist(songIndex);



playlist.addEventListener('dblclick', function(e) {
  let song = ''
  const clickedItem = e.target.closest('.playlist__item');


  if (clickedItem) {
  const allSongs = document.querySelectorAll('.playlist__item')
  allSongs.forEach(function (item, index) {
    console.log(item);
    if (item == clickedItem) {
      song = index;
    }
  })
  
  songIndex = song

  progressBar.value = 0;
  renderSong(songsArray[songIndex]);
  playAudio();
  activeSongInPlaylist(songIndex);
  }
})