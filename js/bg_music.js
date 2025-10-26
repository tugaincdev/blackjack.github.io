// bg_music.js

// -------------------------------
// 🎵 MUSIC SYSTEM
// -------------------------------

// List of background songs
const songList = [
  "./audio/LibraryOfRuinaBgmTheme02.mp3",
  "./audio/LimbusCompanyOSTCasinoStoryTheme2.mp3",
  "./audio/LimbusCompanyOSTCantoIIBattleThemeB2.mp3",
  "./audio/LimbusCompanyCantoIIBattleThemeB1.mp3",
  "./audio/LimbusCompanyOSTCantoIIBattleThemeA1.mp3",
  "./audio/ClairObscurExpedition33MonocoOriginalSoundtrack.mp3",
  "./audio/ClairObscurExpedition33OriginalSoundtrackBonusTrackGestralPrivateClub.mp3",
  "./audio/LimbusCompanyIntervalloIV1BattleTheme.mp3",
  "./audio/LimbusCompanyOSTTimeKillingTime.mp3",
  "./audio/LimbusCompanyOSTObserveNotSee.mp3",
  "./audio/LimbusCompanyOSTGoodDayDetective.mp3",
];

// Cue sound (plays between tracks)
const diceTimePath = "./audio/diceTimeRuina.mp3";

// Card sound (plays when new card drawn)
const cardPath = "./audio/card2.mp3";

// Lightning sound (plays when Lightning Strike is used)
const strikePath = "./audio/lightning-strike.mp3";

// Laugh sound (plays when Lightning Strike is used)
const heathPath = "./audio/erlking-laugh.mp3";

// Audio elements
const bgAudio = document.getElementById("bg-music");
const vfxAudio = document.getElementById("vfx-sounds");

// Keep track of last played song
let lastSongIndex = -1;

// Function to get a random song index different from the last one
function getRandomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songList.length);
  } while (newIndex === lastSongIndex);
  lastSongIndex = newIndex;
  return songList[newIndex];
}

// Function to play the cue, then a random background song
function playCueThenSong() {
  bgAudio.src = diceTimePath;
  bgAudio.play();

  bgAudio.onended = () => {
    bgAudio.src = getRandomSong();
    bgAudio.play();
    bgAudio.onended = playCueThenSong;
  };
}

function playCardSoundDontWait() {
  vfxAudio.src = cardPath;
  vfxAudio.play();
}

function playCardSoundThenWait(next_method) {
  vfxAudio.src = cardPath;
  vfxAudio.play();

  // when sound ends, move to next step
  vfxAudio.onended = () => {
    if (typeof next_method === "function") next_method();
  };
}

// -------------------------------
// ⚙️ SETTINGS MENU
// -------------------------------

// Cache settings elements
const settingsToggleBtn = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const musicControlBtn = document.getElementById("music-toggle");
const musicVolumeSlider = document.getElementById("music-volume");
const vfxControlBtn = document.getElementById("vfx-toggle");
const vfxVolumeSlider = document.getElementById("vfx-volume");

musicVolumeSlider.value = 0.04;
bgAudio.volume = musicVolumeSlider.value;

// Toggle settings panel visibility
settingsToggleBtn.addEventListener("click", () => {
  if (extrasPanel) {
    extrasPanel.style.display = "none";
  }
  const visible = settingsPanel.style.display === "block";
  settingsPanel.style.display = visible ? "none" : "block";
});

// Toggle music on/off
musicControlBtn.addEventListener("click", () => {
  primeAudio(); // unlocks sound context
  if (bgAudio.paused) {
    // Start playing music loop
    playCueThenSong();
    musicControlBtn.textContent = "Stop Music";
    musicControlBtn.classList.remove("btn-success");
    musicControlBtn.classList.add("btn-danger");
  } else {
    // Pause audio
    bgAudio.pause();
    musicControlBtn.textContent = "Play Music";
    musicControlBtn.classList.remove("btn-danger");
    musicControlBtn.classList.add("btn-success");
  }
});

// Adjust volume
musicVolumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value;
  bgAudio.volume = volume;
  console.log("new volume:");
  console.log(volume);
});

// Toggle vfx on/off
vfxControlBtn.addEventListener("click", () => {
  primeAudio(); // unlocks sound context

  if (vfxAudio.muted) {
    // play vfx
    vfxAudio.muted = false;
    vfxControlBtn.textContent = "Mute VFX";
    vfxControlBtn.classList.remove("btn-success");
    vfxControlBtn.classList.add("btn-danger");
  } else {
    // disable vfx
    vfxAudio.muted = true;
    vfxControlBtn.textContent = "Unmute VFX";
    vfxControlBtn.classList.remove("btn-danger");
    vfxControlBtn.classList.add("btn-success");
  }
});

// Adjust volume
vfxVolumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value;
  vfxAudio.volume = volume;
});

//vfx turned on at page launch
vfxAudio.volume = 1.0;

let audioPrimedAlready = false;

function playLightningAndLaugh() {
  // Create two separate Audio objects
  const lightningSound = new Audio(strikePath);
  const laughSound = new Audio(heathPath);

  lightningSound.volume = 0.2;
  laughSound.volume = 0.2;

  // Play both at the same time
  lightningSound.play();
  laughSound.play();
}

//fuck you François Beaufort
function primeAudio() {
  // Save current volumes

  if (audioPrimedAlready == true) {
    return;
  } else {
    const oldMusicVol = bgAudio.volume;
    const oldVfxVol = vfxAudio.volume;

    // Mute both
    bgAudio.volume = 0;
    vfxAudio.volume = 0;

    // Use your existing cue as a quick unlock source
    bgAudio.src = diceTimePath;
    vfxAudio.src = diceTimePath;

    // Play and immediately pause — unlocks audio context
    bgAudio.play();
    vfxAudio.play();

    bgAudio.pause();
    vfxAudio.pause();

    bgAudio.currentTime = 0;
    vfxAudio.currentTime = 0;

    // Restore volumes
    bgAudio.volume = oldMusicVol;
    vfxAudio.volume = oldVfxVol;

    audioPrimedAlready = true;

    console.log("Audio primed successfully.");
  }
}
