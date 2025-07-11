const audio = document.getElementById('audioPlayer');
const quoteText = document.getElementById('quote');
const modeToggle = document.getElementById('modeToggle');
const coverImg = document.getElementById('cover');
const titleText = document.getElementById('title');
const wazSpeakerSelect = document.getElementById('wazSpeaker');
const wazPlaylistDiv = document.getElementById('wazPlaylist');
const clockDiv = document.getElementById('clock');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let isPlaying = false;
let currentList = [];
let currentIndex = 0;

const quotes = [
  "“রহমতের দরজা সবসময় খোলা।”",
  "“আল্লাহ সবরকারীদের সাথে আছেন।”",
  "“যে তওবা করে, সে গুনাহ মুক্ত।”",
  "“কুরআন হল হৃদয়ের নূর।”",
  "“আল্লাহর রহমত সব গুনাহ থেকে বড়।”",
  "“তাওয়াক্কুল করো, কারণ পরিকল্পনা আল্লাহর।”",
  "“দুনিয়া ক্ষণিকের, আখিরাত চিরস্থায়ী।”",
  "“নামাজ ঈমানের পরিচয়।”",
  "“যে আল্লাহকে স্মরণ করে, তার অন্তর শান্ত থাকে।”"

];

let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.innerText = quotes[quoteIndex];
}, 5000);

// ⏰ Clock Setup
setInterval(() => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  clockDiv.innerText = `🕰️ ${hours}:${minutes}:${seconds} ${ampm}`;
}, 1000);

// 📜 Waz Speaker Data
const wazData = {
  tariq: [
    { file: 'waz1.mp3', title: 'আবু  ত্বহা - ১', cover: 'media/covers/waz1.png' },
    { file: 'waz2.mp3', title: 'আবু  ত্বহা - ২', cover: 'media/covers/waz2.png' }
  ],
  Qasemi: [
    { file: 'এই উম্মত.mp3', title: 'এই উম্মত', cover: 'media/covers/Qasemi-1.png' },
    { file: 'চমৎকর এক.mp3', title: 'চমৎকর এক', cover: 'media/covers/Qasemi-2.png' }
  ]
};

// 📖 Quran Surah Data
const quranTracks = {
  'surah_fatiha.mp3': {
    title: 'সূরা ফাতিহা',
    cover: 'media/covers/fatiha.png'
  },
  'surah_ikhlas.mp3': {
    title: 'সূরা ইখলাস',
    cover: 'media/covers/ikhlas.png'
  },
  'surah-ar-rahman.mp3': {
    title: 'সূরা আর-রহমান',
    cover: 'media/covers/Ar-Rahman.png'
  },
  'surah_yasin.mp3': {
    title: 'সূরা ইয়াসিন سورة يس',
    cover: 'media/covers/yasin.png'
  }
};

// 🔁 Quran file list for playlist
const quranTrackList = Object.keys(quranTracks);

// 🔁 Render Speaker Playlist
function renderWazPlaylist(speaker) {
  wazPlaylistDiv.innerHTML = '';
  currentList = wazData[speaker] || [];
  currentIndex = 0;

  currentList.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.textContent = item.title;
    btn.onclick = () => playFromPlaylist(index);
    btn.classList.add('playlist-button');
    wazPlaylistDiv.appendChild(btn);
  });
}

wazSpeakerSelect.addEventListener('change', (e) => {
  renderWazPlaylist(e.target.value);
});

// ▶️ Play From Playlist (for Waz or Quran)
function playFromPlaylist(index) {
  const track = currentList[index];
  if (!track) return;

  if (typeof track === 'string') {
    // Quran
    const qTrack = quranTracks[track];
    if (!qTrack) return;
    audio.src = `media/audio/${track}`;
    titleText.textContent = qTrack.title;
    coverImg.src = qTrack.cover;
  } else {
    // Waz
    audio.src = `media/audio/${track.file}`;
    titleText.textContent = track.title;
    coverImg.src = track.cover;
  }

  audio.play();
  isPlaying = true;
  currentIndex = index;
  coverImg.hidden = false;
  titleText.hidden = false;
}

// ▶️ Play Function (Quran only)
function playAudio(type, file) {
  if (!file) return;
  const track = quranTracks[file];
  if (!track) return;
  audio.src = `media/audio/${file}`;
  audio.play();
  isPlaying = true;
  if (type === 'quran') {
    currentList = quranTrackList;
    currentIndex = quranTrackList.indexOf(file);
  } else {
    currentList = [];
  }
  titleText.textContent = track.title;
  coverImg.src = track.cover;
  coverImg.hidden = false;
  titleText.hidden = false;
}

// 🔁 Play Control
function togglePlay() {
  if (!audio.src) return;
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
}

function nextTrack() {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex + 1) % currentList.length;
  playFromPlaylist(currentIndex);
}

function previousTrack() {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  playFromPlaylist(currentIndex);
}

// ⏳ Progress Bar Setup
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
  progressBar.max = audio.duration;
  durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

// 🌙 Mode Toggle
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  modeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});
// 🔁 Auto next when track ends
audio.addEventListener('ended', () => {
  nextTrack();
});
