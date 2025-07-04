// const audio = document.getElementById('audioPlayer');
// const quoteText = document.getElementById('quote');
// const modeToggle = document.getElementById('modeToggle');
// const coverImg = document.getElementById('cover');
// const titleText = document.getElementById('title');
// let isPlaying = false;

// const quotes = [
//   "“রহমতের দরজা সবসময় খোলা।”",
//   "“আল্লাহ সবরকারীদের সাথে আছেন।”",
//   "“যে তওবা করে, সে গুনাহ মুক্ত।”",
//   "“কুরআন হল হৃদয়ের নূর।”"
// ];

// let quoteIndex = 0;
// setInterval(() => {
//   quoteIndex = (quoteIndex + 1) % quotes.length;
//   quoteText.innerText = quotes[quoteIndex];
// }, 5000);

// const tracks = {
//   waz: {
//     'waz1.mp3': {
//       title: 'কথা গুলো আপনাকে নাড়া দিবে | আবু ত্বহা মুহাম্মদ আদনান ',
//       cover: 'media/covers/waz1.png'
//     },
//     'waz2.mp3': {
//       title: ' ছেড়ে দেওয়ার মাঝে সুখ আছে | আবু ত্বহা মুহাম্মদ আদনান',
//       cover: 'media/covers/waz2.png'
//     }
//   },
//   quran: {
//     'surah_fatiha.mp3': {
//       title: 'সূরা ফাতিহা',
//       cover: 'media/covers/fatiha.jpg'
//     },
//     'surah_ikhlas.mp3': {
//       title: 'সূরা ইখলাস',
//       cover: 'media/covers/ikhlas.jpg'
//     }
//   }
// };

// function playAudio(type, file) {
//   if (!file) return;
//   audio.src = `media/audio/${file}`;
//   audio.play();
//   isPlaying = true;
//   titleText.textContent = tracks[type][file].title;
//   coverImg.src = tracks[type][file].cover;
//   coverImg.hidden = false;
//   titleText.hidden = false;
// }

// function togglePlay() {
//   if (!audio.src) return;
//   if (isPlaying) {
//     audio.pause();
//   } else {
//     audio.play();
//   }
//   isPlaying = !isPlaying;
// }

// modeToggle.addEventListener('click', () => {
//   document.body.classList.toggle('light-mode');
//   modeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
// });

const audio = document.getElementById('audioPlayer');
const quoteText = document.getElementById('quote');
const modeToggle = document.getElementById('modeToggle');
const coverImg = document.getElementById('cover');
const titleText = document.getElementById('title');
const wazSpeakerSelect = document.getElementById('wazSpeaker');
const wazPlaylistDiv = document.getElementById('wazPlaylist');
const clockDiv = document.getElementById('clock');
const progressBar = document.getElementById('progressBar');

let isPlaying = false;
let currentList = [];
let currentIndex = 0;

// ---------------- Islamic Quotes Slider ---------------- //
const quotes = [
  "“রহমতের দরজা সবসময় খোলা।”",
  "“আল্লাহ সবরকারীদের সাথে আছেন।”",
  "“যে তওবা করে, সে গুনাহ মুক্ত।”",
  "“কুরআন হল হৃদয়ের নূর।”"
];

let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.innerText = quotes[quoteIndex];
}, 5000);

// ---------------- Clock Setup (12-hour format) ---------------- //
setInterval(() => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  clockDiv.innerText = `🕰️ ${hours}:${minutes} ${ampm}`;
}, 1000);

// ---------------- Speaker Data ---------------- //
const wazData = {
  tariq: [
    { file: 'waz1.mp3', title: 'তরিক জামিল - ১', cover: 'media/covers/waz1.jpg' },
    { file: 'waz2.mp3', title: 'তরিক জামিল - ২', cover: 'media/covers/waz2.jpg' }
  ],
  fayzul: [
    { file: 'fayzul1.mp3', title: 'ফয়জুল্লাহ - ১', cover: 'media/covers/fayzul1.jpg' },
    { file: 'fayzul2.mp3', title: 'ফয়জুল্লাহ - ২', cover: 'media/covers/fayzul2.jpg' }
  ]
};

// ---------------- Quran Surah Data ---------------- //
const quranTracks = {
  'surah_fatiha.mp3': {
    title: 'সূরা ফাতিহা',
    cover: 'media/covers/fatiha.jpg'
  },
  'surah_ikhlas.mp3': {
    title: 'সূরা ইখলাস',
    cover: 'media/covers/ikhlas.jpg'
  }
};

// ---------------- Render Waz Playlist ---------------- //
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

// ---------------- Play Functions ---------------- //
function playFromPlaylist(index) {
  const track = currentList[index];
  if (!track) return;
  audio.src = `media/audio/${track.file}`;
  audio.play();
  isPlaying = true;
  currentIndex = index;
  titleText.textContent = track.title;
  coverImg.src = track.cover;
  coverImg.hidden = false;
  titleText.hidden = false;
}

function playAudio(type, file) {
  if (!file) return;
  const track = quranTracks[file];
  if (!track) return;
  audio.src = `media/audio/${file}`;
  audio.play();
  isPlaying = true;
  currentList = [];
  titleText.textContent = track.title;
  coverImg.src = track.cover;
  coverImg.hidden = false;
  titleText.hidden = false;
}

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

// ---------------- Progress Bar ---------------- //
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + '%';
});

// ---------------- Mode Toggle ---------------- //
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  modeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});
