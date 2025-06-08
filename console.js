// console.js - Audio Player Controller

let audioSample = null;
let audioBeat = null;
let isSamplePlaying = false;
let isBeatPlaying = false;
let isPlaying = false;

// URL del file MP3 da inserire poi per webflow
const MP3_SAMPLE = "./3-campione.mp3";
const MP3_BEAT = "./3-beat.mp3";

// funzioni gestione CAMPIONE
function initAudioSample() {
  if (!audioSample) {
    audioSample = new Audio(MP3_SAMPLE);
    audioSample.loop = true; // Loop continuo

    // Event listeners per debug
    audioSample.addEventListener("loadstart", () =>
      console.log("Audio Sample: Caricamento iniziato")
    );
    audioSample.addEventListener("canplay", () =>
      console.log("Audio Sample: Pronto per la riproduzione")
    );
    audioSample.addEventListener("error", (e) =>
      console.error("Errore audio sample:", e)
    );
    audioSample.addEventListener("ended", () => {
      isSamplePlaying = false;
      updateVisualState();
    });
  }
}
function playSample() {
  initAudioSample();

  if (audioSample && !isSamplePlaying) {
    audioSample
      .play()
      .then(() => {
        isSamplePlaying = true;
        updateVisualState();
        console.log("Audio Sample: Riproduzione iniziata");
      })
      .catch((error) => {
        console.error("Errore nella riproduzione sample:", error);
        alert(
          "Errore nella riproduzione dell'audio sample. Controlla la connessione."
        );
      });
  }
}
function pauseSample() {
  if (audioSample && isSamplePlaying) {
    audioSample.pause();
    isSamplePlaying = false;
    updateVisualState();
    console.log("Audio Sample: In pausa");
  }
}

// funzioni gestione BEAT
function initAudioBeat() {
  if (!audioBeat) {
    audioBeat = new Audio(MP3_BEAT);
    audioBeat.loop = true; // Loop continuo

    // Event listeners per debug
    audioBeat.addEventListener("loadstart", () =>
      console.log("Audio Beat: Caricamento iniziato")
    );
    audioBeat.addEventListener("canplay", () =>
      console.log("Audio Beat: Pronto per la riproduzione")
    );
    audioBeat.addEventListener("error", (e) =>
      console.error("Errore audio beat:", e)
    );
    audioBeat.addEventListener("ended", () => {
      isBeatPlaying = false;
      updateVisualState();
    });
  }
}
function playBeat() {
  initAudioBeat();

  if (audioBeat && !isBeatPlaying) {
    audioBeat
      .play()
      .then(() => {
        isBeatPlaying = true;
        updateVisualState();
        console.log("Audio Beat: Riproduzione iniziata");
      })
      .catch((error) => {
        console.error("Errore nella riproduzione beat:", error);
        alert(
          "Errore nella riproduzione dell'audio beat. Controlla la connessione."
        );
      });
  }
}
function pauseBeat() {
  if (audioBeat && isBeatPlaying) {
    audioBeat.pause();
    isBeatPlaying = false;
    updateVisualState();
    console.log("Audio Beat: In pausa");
  }
}

// Funzione per aggiornare stile bottoni
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

// event listeners x click sui "gruppi"
document.addEventListener("DOMContentLoaded", function () {
  console.log("Console Audio Player inizializzato");

  // Gruppo 1 - PLAY SAMPLE
  const gruppo1 = document.getElementById("gruppo-1");
  if (gruppo1) {
    gruppo1.addEventListener("click", function () {
      console.log("Click su Gruppo 1 - PLAY SAMPLE");
      playSample();
    });
  }

  // Gruppo 2 - PAUSE SAMPLE
  const gruppo2 = document.getElementById("gruppo-2");
  if (gruppo2) {
    gruppo2.addEventListener("click", function () {
      console.log("Click su Gruppo 2 - PAUSE SAMPLE");
      pauseSample();
    });
  }

  // Gruppo 3 - PLAY BEAT
  const gruppo3 = document.getElementById("gruppo-3");
  if (gruppo3) {
    gruppo3.addEventListener("click", function () {
      console.log("Click su Gruppo 3 - PLAY BEAT");
      playBeat();
    });
  }

  // Gruppo 4 - PAUSE BEAT
  const gruppo4 = document.getElementById("gruppo-4");
  if (gruppo4) {
    gruppo4.addEventListener("click", function () {
      console.log("Click su Gruppo 4 - PAUSE BEAT");
      pauseBeat();
    });
  }

  updateVisualState();

  // precarica gli audio
  setTimeout(() => {
    initAudioSample();
    initAudioBeat();
  }, 1000);
});

// Funzioni di controllo aggiuntive (opzionali)
function setSampleVolume(volume) {
  if (audioSample) {
    audioSample.volume = Math.max(0, Math.min(1, volume));
    console.log(`Volume Sample impostato a: ${audioSample.volume * 100}%`);
  }
}

// Funzioni di controllo aggiuntive per BEAT
function setBeatVolume(volume) {
  if (audioBeat) {
    audioBeat.volume = Math.max(0, Math.min(1, volume));
    console.log(`Volume Beat impostato a: ${audioBeat.volume * 100}%`);
  }
}

// Export per uso esterno (se necessario)
window.audioPlayer = {
  playSample: playSample,
  pauseSample: pauseSample,
  playBeat: playBeat,
  pauseBeat: pauseBeat,
  setSampleVolume: setSampleVolume,
  setBeatVolume: setBeatVolume,
  isSamplePlaying: () => isSamplePlaying,
  isBeatPlaying: () => isBeatPlaying,
};
