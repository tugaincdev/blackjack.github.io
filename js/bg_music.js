
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
const cardPath = "./audio/card.mp3";

// Lightning sound (plays when Lightning Strike is used)
const strikePath = "./audio/lightning-strike.mp3";

// Laugh sound (plays when Lightning Strike is used)
const heathPath = "./audio/erlking-laugh.mp3";

// Inspect sound (plays when Quick Inspect is used)
const inspectPath = "./audio/inspect.mp3";

// Reveal sound (plays when Reveal Hidden Card is used)
const revealPath = "./audio/reveal.mp3";

// Compass sound (plays when Compass Intuition is used)
const compassPath = "./audio/compass.mp3";

// Lootbox sound (plays when Lootbox is used)
const lootboxPath = "./audio/lootbox.mp3";

// Money sound (plays when money is spent in the shop)
const moneyPath = "./audio/money_spent.mp3";


const bgAudio = document.getElementById("bg-music");
const vfxAudio = document.getElementById("vfx-sounds");

// Keep track of last played song
let lastSongIndex = -1;


function getRandomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songList.length);
  } while (newIndex === lastSongIndex);
  lastSongIndex = newIndex;
  return songList[newIndex];
}


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

function playRevealCardSoundThenWait(next_method) {
  vfxAudio.src = revealPath;
  vfxAudio.play();

  // when sound ends, move to next step
  vfxAudio.onended = () => {
    if (typeof next_method === "function") next_method();
  };
}


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


musicVolumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value;
  bgAudio.volume = volume;
  console.log("new volume:");
  console.log(volume);
});


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


vfxVolumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value;
  vfxAudio.volume = volume;
});

//vfx turned on at page launch
vfxAudio.volume = 1.0;

let audioPrimedAlready = false;

function playLightningAndLaugh() {
  
  const lightningSound = new Audio(strikePath);
  const laughSound = new Audio(heathPath);

  lightningSound.volume = 0.2;
  laughSound.volume = 0.2;

 
  lightningSound.play();
  laughSound.play();
}

function playInspectSound() {
  const inspectSound = new Audio(inspectPath);

  inspectSound.volume = 0.2;

  
  inspectSound.play();
}

function playRevealSound() {
  const revealSound = new Audio(revealPath);

  revealSound.volume = 0.2;

 
  revealSound.play();
}

function playCompassSound() {
  const compassSound = new Audio(compassPath);

  compassSound.volume = 0.2;

 
  compassSound.play();
}

function playLootboxSound() {
  const lootboxSound = new Audio(lootboxPath);

  lootboxSound.volume = 0.2;

 
  lootboxSound.play();
}

function playMoneySound() {
  const moneySound = new Audio(moneyPath);

  moneySound.volume = 0.2;

 
  moneySound.play();
}

//f FrançoisBeaufort
function primeAudio() {
  

  if (audioPrimedAlready == true) {
    return;
  } else {
    const oldMusicVol = bgAudio.volume;
    const oldVfxVol = vfxAudio.volume;

    
    bgAudio.volume = 0;
    vfxAudio.volume = 0;

    
    bgAudio.src = diceTimePath;
    vfxAudio.src = diceTimePath;

   
    bgAudio.play();
    vfxAudio.play();

    bgAudio.pause();
    vfxAudio.pause();

    bgAudio.currentTime = 0;
    vfxAudio.currentTime = 0;

  
    bgAudio.volume = oldMusicVol;
    vfxAudio.volume = oldVfxVol;

    audioPrimedAlready = true;

    console.log("Audio primed successfully.");
  }
}


