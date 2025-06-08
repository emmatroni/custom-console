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

// gestione stile bottoni
function updateVisualState() {
  const cerchio1 = document.querySelector("#CERCHIO1 path:first-child");
  const cerchio1Border = document.querySelector("#CERCHIO1 path:nth-child(2)");
  const cerchio2 = document.querySelector("#CERCHIO2 path:first-child");
  const cerchio2Border = document.querySelector("#CERCHIO2 path:nth-child(2)");
  const cerchio3 = document.querySelector("#CERCHIO3 path:first-child");
  const cerchio3Border = document.querySelector("#CERCHIO3 path:nth-child(2)");
  const cerchio4 = document.querySelector("#CERCHIO4 path:first-child");
  const cerchio4Border = document.querySelector("#CERCHIO4 path:nth-child(2)");

  cerchio1Border.style.fill = "#ffffff";
  cerchio2Border.style.fill = "#ffffff";
  cerchio3Border.style.fill = "#ffffff";
  cerchio4Border.style.fill = "#ffffff";

  // Aggiorna CERCHIO1 basato su isSamplePlaying
  if (cerchio1 && cerchio1Border) {
    if (isSamplePlaying) {
      cerchio1.style.fill = "#fa5004";
      cerchio2.style.fill = "#ffffff";
    } else {
      cerchio1.style.fill = "#ffffff";
      cerchio2.style.fill = "#fa5004";
    }
  }

  // Aggiorna CERCHIO3 basato su isBeatPlaying
  if (cerchio3 && cerchio3Border) {
    if (isBeatPlaying) {
      cerchio3.style.fill = "#fa5004";
      cerchio4.style.fill = "#ffffff";
    } else {
      cerchio3.style.fill = "#ffffff";
      cerchio4.style.fill = "#fa5004";
    }
  }
}
// event listeners x click sui "gruppi"
document.addEventListener("DOMContentLoaded", function () {
  console.log("Console Audio Player inizializzato");

  // bottone 1 - PLAY SAMPLE
  const bottone1 = document.getElementById("bottone-1");
  if (bottone1) {
    bottone1.addEventListener("click", function () {
      console.log("Click su bottone 1 - PLAY SAMPLE");
      playSample();
    });
  }

  // bottone 2 - PAUSE SAMPLE
  const bottone2 = document.getElementById("bottone-2");
  if (bottone2) {
    bottone2.addEventListener("click", function () {
      console.log("Click su bottone 2 - PAUSE SAMPLE");
      pauseSample();
    });
  }

  // bottone 3 - PLAY BEAT
  const bottone3 = document.getElementById("bottone-3");
  if (bottone3) {
    bottone3.addEventListener("click", function () {
      console.log("Click su bottone 3 - PLAY BEAT");
      playBeat();
    });
  }

  // bottone 4 - PAUSE BEAT
  const bottone4 = document.getElementById("bottone-4");
  if (bottone4) {
    bottone4.addEventListener("click", function () {
      console.log("Click su bottone 4 - PAUSE BEAT");
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
