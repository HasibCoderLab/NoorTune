const audio = document.getElementById('audioPlayer');
const quoteText = document.getElementById('quote');
const modeToggle = document.getElementById('modeToggle');
const coverImg = document.getElementById('cover');
const titleText = document.getElementById('title');
let isPlaying = false;

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

const tracks = {
  waz: {
    'waz1.mp3': {
      title: 'মাওলানা তারিক জামিল',
      cover: 'media/covers/waz1.jpg'
    },
    'waz2.mp3': {
      title: 'আবু-ত্বহা_মুহাম্মদ_আদনান',
      cover: 'media/covers/waz2.jpg'
    }
  },
  quran: {
    'surah_fatiha.mp3': {
      title: 'সূরা ফাতিহা',
      cover: 'media/covers/fatiha.jpg'
    },
    'surah_ikhlas.mp3': {
      title: 'সূরা ইখলাস',
      cover: 'media/covers/ikhlas.jpg'
    }
  }
};

function playAudio(type, file) {
  if (!file) return;
  audio.src = `media/audio/${file}`;
  audio.play();
  isPlaying = true;
  titleText.textContent = tracks[type][file].title;
  coverImg.src = tracks[type][file].cover;
  coverImg.hidden = false;
  titleText.hidden = false;
}

function togglePlay() {
  if (!audio.src) return;
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
}

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  modeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});
s