const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
    {
        name:'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name:'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name:'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric / Jacinto Design',
    }
]

// Check if playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}
// Pause
const pauseSong = () => {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

// Previous Song
const prevSong = () => {
    songIndex = (songIndex==0) ? (songs.length-1) : (songIndex-1);
    loadSong(songs[songIndex])
    playSong()
}
// Next Song
const nextSong = () => {
    songIndex = (songIndex+1)%songs.length;
    loadSong(songs[songIndex])
    playSong()
}

// On Load
loadSong(songs[songIndex]);

const updateCurrentTimeDuration = (duration, currentTime) => {
    const durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.floor(duration%60)
    durationSeconds = (durationSeconds<10) ? `0${durationSeconds}` : `${durationSeconds}`
    if(durationSeconds && durationMinutes){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentTimeMinutes = Math.floor(currentTime/60)
    let currentTimeSeconds = Math.floor(currentTime%60)
    currentTimeSeconds = (currentTimeSeconds<10) ? `0${currentTimeSeconds}` : `${currentTimeSeconds}`
    currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
}

const updateProgressBar = (e) => {
    if(isPlaying) {
        const {duration , currentTime} = e.srcElement
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`
        updateCurrentTimeDuration(duration, currentTime)
    }
}

const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music
    music.currentTime = clickX/width * duration;
    progress.style.width = `${clickX/width * 100}%`
    updateCurrentTimeDuration(duration, music.currentTime)
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
music.addEventListener('ended', nextSong)