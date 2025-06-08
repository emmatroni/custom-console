// console.js - Audio Player Controller

// Inizializzazione dell'audio
let audioSample = null;
let audio = null;

let isPlaying = false;

// URL del file MP3
const MP3_SAMPLE = "./3-campione.mp3";
const MP3_BEAT = "./3-beat.mp3";

// Funzione per inizializzare l'audio
function initAudio() {
  if (!audio) {
    audio = new Audio(MP3_SAMPLE);
    audio.loop = true; // Loop continuo

    // Event listeners per debug
    audio.addEventListener("loadstart", () =>
      console.log("Audio: Caricamento iniziato")
    );
    audio.addEventListener("canplay", () =>
      console.log("Audio: Pronto per la riproduzione")
    );
    audio.addEventListener("error", (e) => console.error("Errore audio:", e));
    audio.addEventListener("ended", () => {
      isPlaying = false;
      updateVisualState();
    });
  }
}

// Funzione per riprodurre l'audio
function playAudio() {
  initAudio();

  if (audio && !isPlaying) {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        updateVisualState();
        console.log("Audio: Riproduzione iniziata");
      })
      .catch((error) => {
        console.error("Errore nella riproduzione:", error);
        alert(
          "Errore nella riproduzione dell'audio. Controlla la connessione."
        );
      });
  }
}

// Funzione per mettere in pausa l'audio
function pauseAudio() {
  if (audio && isPlaying) {
    audio.pause();
    isPlaying = false;
    updateVisualState();
    console.log("Audio: In pausa");
  }
}

// Funzione per aggiornare lo stato visivo dei bottoni
function updateVisualState() {
  //const gruppo1 = document.getElementById('gruppo-1');
  //const gruppo2 = document.getElementById('gruppo-2');
  const c1 = document.getElementById("BASE1");

  if (isPlaying) {
    // Quando sta suonando: gruppo1 (play) disattivato, gruppo2 (pause) attivo
    // gruppo1.style.opacity = '0.6';
    // gruppo2.style.opacity = '1';
    c1.style.fill = "#fa5004";
  } else {
    // Quando è in pausa: gruppo1 (play) attivo, gruppo2 (pause) disattivato
    // gruppo1.style.opacity = '1';
    // gruppo2.style.opacity = '0.6';
    c1.style.fill = "#fffff";
  }
}

// Event listeners per i click sui gruppi
document.addEventListener("DOMContentLoaded", function () {
  console.log("Console Audio Player inizializzato");

  // Gruppo 1 - PLAY
  const gruppo1 = document.getElementById("gruppo-1");
  if (gruppo1) {
    gruppo1.addEventListener("click", function () {
      console.log("Click su Gruppo 1 - PLAY");
      playAudio();
    });
  }

  // Gruppo 2 - PAUSE
  const gruppo2 = document.getElementById("gruppo-2");
  if (gruppo2) {
    gruppo2.addEventListener("click", function () {
      console.log("Click su Gruppo 2 - PAUSE");
      pauseAudio();
    });
  }

  // Inizializza lo stato visivo
  updateVisualState();

  // Precarica l'audio (opzionale)
  setTimeout(() => {
    initAudio();
  }, 1000);
});

// Funzioni di controllo aggiuntive (opzionali)
function setVolume(volume) {
  if (audio) {
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp tra 0 e 1
    console.log(`Volume impostato a: ${audio.volume * 100}%`);
  }
}

function getCurrentTime() {
  return audio ? audio.currentTime : 0;
}

function getDuration() {
  return audio ? audio.duration : 0;
}

// Export per uso esterno (se necessario)
window.audioPlayer = {
  play: playAudio,
  pause: pauseAudio,
  setVolume: setVolume,
  getCurrentTime: getCurrentTime,
  getDuration: getDuration,
  isPlaying: () => isPlaying,
};
