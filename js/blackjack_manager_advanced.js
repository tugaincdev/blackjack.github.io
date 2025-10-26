// Blackjack OOP ADVANCED

const btnShop = document.getElementById("btn-shop");
const shopMenu = document.getElementById("shop-menu");
const leaveShopBtn = document.getElementById("leave-shop-btn");
const revealHiddenShopBtn = document.getElementById("buy-shop-reveal");
//---------------------------------------------
const compassShopBtn = document.getElementById("buy-shop-compass");
const lightningShopBtn = document.getElementById("buy-shop-lightning");
const inspectShopBtn = document.getElementById("buy-shop-quick-inspect");
const lootboxShopBtn = document.getElementById("buy-shop-lootbox");

const btnPowerUps = document.getElementById("btn-powerups");
const powerUpsMenu = document.getElementById("powerUps-menu");
const leavePowerUpsBtn = document.getElementById("leave-powerUps-btn");
const revealHiddenPowerUpsBtn = document.getElementById(
  "use-power-up-reveal-button"
);
//---------------------------------------
const compassPowerUpsBtn = document.getElementById("use-power-up-compass");
const lightningPowerUpsBtn = document.getElementById("use-power-up-lightning");
const inspectPowerUpsBtn = document.getElementById(
  "use-power-up-quick-inspect"
);

function newAdvancedGame() {
  //ADJYST POWERUP INICIALIZATION LATER
  console.log("✅ newAdvancedGame() called");
  newGame("advanced"); //still in its infancy
  const extrasMenu = document.getElementById("extras-menu");
  extrasMenu.style.display = "block"; // make the whole thing visible

  console.log("✅ extrasMenu display set to block");
}

const sparkleEl = document.getElementById("sparkle");
const extrasToggleBtn = document.getElementById("extras-toggle");
const extrasPanel = document.getElementById("extras-panel");
const revealHiddenCount = document.getElementById("power-up-reveal-count");
//-----------------------------------------
const compassCount = document.getElementById("power-up-compass-count");
const lightningCount = document.getElementById("power-up-lightning-count");
const inspectCount = document.getElementById("power-up-quick-inspect-count");

extrasToggleBtn.addEventListener("click", () => {
  console.log("🎯 extras toggle clicked!");

  sparkleEl.style.display = "none";

  // Hide settings panel if open
  if (settingsPanel) settingsPanel.style.display = "none";

  // Toggle the extras panel visibility
  const visible = extrasPanel.style.display === "block";
  extrasPanel.style.display = visible ? "none" : "block";
});

btnPowerUps.addEventListener("click", () => {
  // Block the main game by showing the power ups menu overlay
  shopMenu.style.display = "none"; // hide the shop menu
  powerUpsMenu.style.display = "flex"; // show the power ups menu
});

leavePowerUpsBtn.addEventListener("click", () => {
  // Close the power ups menu and unblock the main game
  powerUpsMenu.style.display = "none"; // hide the power ups menu
});

btnShop.addEventListener("click", () => {
  // Block the main game by showing the shop menu overlay
  powerUpsMenu.style.display = "none"; // hide the power ups menu
  shopMenu.style.display = "flex"; // show the shop menu
});

leaveShopBtn.addEventListener("click", () => {
  // Close the shop menu and unblock the main game
  shopMenu.style.display = "none"; // hide the shop menu
});

//------------------

let revealHasBeenUsedThisRound = false;

revealHiddenPowerUpsBtn.addEventListener("click", () => {
  if (!game.dealerTurn) {
    const hiddenSlot = document.getElementById("dealer").lastElementChild;
    const hiddenCard = hiddenSlot.querySelector("img");
    if (hiddenCard) {
      let cardToAddName = game.dealerCards[1].printName();
      hiddenCard.src = `./images/svg/${cardToAddName}.svg`;

      playRevealSound();

      game.powerUpList.revealHidden--;
      revealHasBeenUsedThisRound = true;

      //if (game.powerUpList.revealHidden == 0) //not using this if, because will only be used once per game
      revealHiddenPowerUpsBtn.disabled = true;

      //change "0x" text to revealHidden value
      if (revealHiddenCount) {
        revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;
      }

      powerUpsMenu.style.display = "none"; // hide the power ups menu
    }
  }
});

let compassHasBeenUsedThisRound = false;

compassPowerUpsBtn.addEventListener("click", () => {
  if (!game.dealerTurn) {
    let nextCardOnDeck = game.deck[0];
    let playerCurrentDeck = game.playerCards;
    let playerHypotheticalDeck = [...playerCurrentDeck, nextCardOnDeck];
    let playerHypotheticalValue = game.getCardsValue(playerHypotheticalDeck);

    playCompassSound();

    if (playerHypotheticalValue > 25) {
      showToast("Be careful. The next card on the deck will make you bust.");
    } else {
      showToast("At ease. The next card on the deck will not make you bust.");
    }

    game.powerUpList.compass--;
    compassHasBeenUsedThisRound = true;

    //change "0x" text to compass value
    if (compassCount) {
      compassCount.textContent = `${game.powerUpList.compass}x`;
    }

    powerUpsMenu.style.display = "none"; // hide the power ups menu
  }
  compassPowerUpsBtn.disabled = true;
});

let numberOfLightningsUsedThisRound = 0;

lightningPowerUpsBtn.addEventListener("click", () => {
  if (!game.dealerTurn) {
    let playerCurrentDeck = game.playerCards;
    let cardImages = document.querySelectorAll("#player img");

    let unstruckCards = Array.from(cardImages).filter((img) => {
      return !img.classList.contains("struck");
    });

    powerUpsMenu.style.display = "none"; // hide the power ups menu

    let randomIndex = Math.floor(Math.random() * unstruckCards.length);
    let cardToStrike = unstruckCards[randomIndex];

    cardToStrike.classList.add("struck");

    playLightningAndLaugh();

    // ===== Add lightning bolt =====
    const lightning = document.createElement("div");
    lightning.classList.add("lightning-overlay");
    cardToStrike.parentNode.appendChild(lightning);

    // ===== Add burned/charred effect =====
    cardToStrike.classList.add("burned");

    // ===== Add electric sparks =====
    const sparks = document.createElement("div");
    sparks.classList.add("electric-sparks");
    cardToStrike.parentNode.appendChild(sparks);

    let logicalIndex = playerCurrentDeck.findIndex(
      (card) => card.printName() === cardToStrike.alt
    );
    if (logicalIndex !== -1) playerCurrentDeck.splice(logicalIndex, 1);

    game.powerUpList.lightning--;

    //change "0x" text to compass value
    if (lightningCount) {
      lightningCount.textContent = `${game.powerUpList.lightning}x`;
    }

    if (unstruckCards.length - 1 == 0 || game.powerUpList.lightning == 0) {
      lightningPowerUpsBtn.disabled = true;
    }
  }
});

let inspectHasBeenUsedThisRound = false;

inspectPowerUpsBtn.addEventListener("click", () => {
  if (!game.dealerTurn) {
    const overlay = document.getElementById("quick-inspect-overlay");
    const cardImg = document.getElementById("quick-inspect-card");

    let nextCardOnDeck = game.deck[0];
    let nextCardName = nextCardOnDeck.printName();
    const imagePath = `./images/svg/${nextCardName}.svg`;

    powerUpsMenu.style.display = "none"; // hide the power ups menu

    cardImg.src = imagePath;
    cardImg.alt = nextCardName;

    playInspectSound();

    overlay.style.display = "block";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);

    game.powerUpList.quick_inspect--;
    inspectHasBeenUsedThisRound = true;

    if (inspectCount) {
      inspectCount.textContent = `${game.powerUpList.quick_inspect}x`;
    }
  }
  inspectPowerUpsBtn.disabled = true;
});

//-----------------------------------------

revealHiddenShopBtn.addEventListener("click", () => {
  game.powerUpList.revealHidden++;
  revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;

  if (!revealHasBeenUsedThisRound) {
    revealHiddenPowerUpsBtn.disabled = false;
  }

  game.money = game.money - 10;
  revealHiddenShopBtn.disabled = game.getBalance() < 10;
  compassShopBtn.disabled = game.getBalance() < 50;
  lightningShopBtn.disabled = game.getBalance() < 100;
  lootboxShopBtn.disabled = game.getBalance() < 150;
  inspectShopBtn.disabled = game.getBalance() < 300;

  updateMoneyDisplay();
});

compassShopBtn.addEventListener("click", () => {
  game.powerUpList.compass++;
  compassCount.textContent = `${game.powerUpList.compass}x`;

  if (!compassHasBeenUsedThisRound) {
    compassPowerUpsBtn.disabled = false;
  }

  game.money = game.money - 50;
  revealHiddenShopBtn.disabled = game.getBalance() < 10;
  compassShopBtn.disabled = game.getBalance() < 50;
  lightningShopBtn.disabled = game.getBalance() < 100;
  lootboxShopBtn.disabled = game.getBalance() < 150;
  inspectShopBtn.disabled = game.getBalance() < 300;

  updateMoneyDisplay();
});

lightningShopBtn.addEventListener("click", () => {
  game.powerUpList.lightning++;
  lightningCount.textContent = `${game.powerUpList.lightning}x`;

  if (game.playerCards.length != 0) {
    lightningPowerUpsBtn.disabled = false;
  }
  game.money = game.money - 100;
  revealHiddenShopBtn.disabled = game.getBalance() < 10;
  compassShopBtn.disabled = game.getBalance() < 50;
  lightningShopBtn.disabled = game.getBalance() < 100;
  lootboxShopBtn.disabled = game.getBalance() < 150;
  inspectShopBtn.disabled = game.getBalance() < 300;

  updateMoneyDisplay();
});

inspectShopBtn.addEventListener("click", () => {
  game.powerUpList.quick_inspect++;
  inspectCount.textContent = `${game.powerUpList.quick_inspect}x`;

  if (!inspectHasBeenUsedThisRound) {
    inspectPowerUpsBtn.disabled = false;
  }

  game.money = game.money - 300;
  revealHiddenShopBtn.disabled = game.getBalance() < 10;
  compassShopBtn.disabled = game.getBalance() < 50;
  lightningShopBtn.disabled = game.getBalance() < 100;
  lootboxShopBtn.disabled = game.getBalance() < 150;
  inspectShopBtn.disabled = game.getBalance() < 300;

  updateMoneyDisplay();
});

lootboxShopBtn.addEventListener("click", () => {
  game.money = game.money - 150;

  updateMoneyDisplay();

  const powerUps = [
    { name: "Card Reveal", weight: 45 }, // 45% chance
    { name: "Compass Intuition", weight: 40 }, // 40% chance
    { name: "Lightning Strike", weight: 10 }, // 10% chance
    { name: "Quick Inspect", weight: 5 }, // 5% chance
  ];

  const totalWeight = 100;

  let random = Math.random() * totalWeight;

  let selectedPowerUp = null;
  for (let pu of powerUps) {
    if (random < pu.weight) {
      selectedPowerUp = pu.name;
      break;
    }
    random -= pu.weight;
  }

  console.log("Lootbox gave you: ");
  console.log(selectedPowerUp);

  //-----------------------------------------------------------------------------------

  const overlay = document.getElementById("lootbox-result-overlay");
  const textEl = document.getElementById("lootbox-result-text");
  const iconEl = document.getElementById("lootbox-result-icon");
  iconName = null;

  switch (selectedPowerUp) {
    case "Card Reveal":
      iconName = "eye-fill";
      game.powerUpList.revealHidden++;
      revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;
      if (!revealHasBeenUsedThisRound) {
        revealHiddenPowerUpsBtn.disabled = false;
      }
      revealHiddenShopBtn.disabled = game.getBalance() < 10;
      compassShopBtn.disabled = game.getBalance() < 50;
      lightningShopBtn.disabled = game.getBalance() < 100;
      lootboxShopBtn.disabled = game.getBalance() < 150;
      inspectShopBtn.disabled = game.getBalance() < 300;
      //
      break;
    case "Compass Intuition":
      iconName = "compass";
      game.powerUpList.compass++;
      compassCount.textContent = `${game.powerUpList.compass}x`;
      if (!compassHasBeenUsedThisRound) {
        compassPowerUpsBtn.disabled = false;
      }
      revealHiddenShopBtn.disabled = game.getBalance() < 10;
      compassShopBtn.disabled = game.getBalance() < 50;
      lightningShopBtn.disabled = game.getBalance() < 100;
      lootboxShopBtn.disabled = game.getBalance() < 150;
      inspectShopBtn.disabled = game.getBalance() < 300;
      //
      break;
    case "Lightning Strike":
      iconName = "lightning";
      game.powerUpList.lightning++;
      lightningCount.textContent = `${game.powerUpList.lightning}x`;
      if (game.playerCards.length != 0) {
        lightningPowerUpsBtn.disabled = false;
      }
      revealHiddenShopBtn.disabled = game.getBalance() < 10;
      compassShopBtn.disabled = game.getBalance() < 50;
      lightningShopBtn.disabled = game.getBalance() < 100;
      lootboxShopBtn.disabled = game.getBalance() < 150;
      inspectShopBtn.disabled = game.getBalance() < 300;
      //
      break;
    case "Quick Inspect":
      iconName = "search";
      game.powerUpList.quick_inspect++;
      inspectCount.textContent = `${game.powerUpList.quick_inspect}x`;
      if (!inspectHasBeenUsedThisRound) {
        inspectPowerUpsBtn.disabled = false;
      }
      revealHiddenShopBtn.disabled = game.getBalance() < 10;
      compassShopBtn.disabled = game.getBalance() < 50;
      lightningShopBtn.disabled = game.getBalance() < 100;
      lootboxShopBtn.disabled = game.getBalance() < 150;
      inspectShopBtn.disabled = game.getBalance() < 300;
      //
      break;
    default:
      break;
  }

  textEl.textContent = selectedPowerUp;
  iconEl.className = `bi bi-${iconName} power-up-icon`;

  overlay.style.display = "block";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 3000);

  return;
});

function newGameBasicOrAdvanced() {
  revealHasBeenUsedThisRound = false;
  compassHasBeenUsedThisRound = false;
  inspectHasBeenUsedThisRound = false;
  numberOfLightningsUsedThisRound = 0;

  if (gameVersion == "basic") {
    newGame(gameVersion); // start the actual game
  } else if (gameVersion == "advanced") {
    newAdvancedGame(); // start the actual game
  }
}

function basicOrAdvancedPrintCard(
  element,
  card,
  hidden = false,
  replace = false
) {
  if (gameVersion == "basic") {
    printCard(element, card, hidden, replace);
  } else if (gameVersion == "advanced") {
    printCardThenAdjustPowerUps(element, card, hidden, replace);
  }
}

function printCardThenAdjustPowerUps(
  element,
  card,
  hidden = false,
  replace = false
) {
  if (revealHasBeenUsedThisRound && hidden) {
    console.log(
      "Tried to replace hidden card, but reveal power up was already used this round, so don't do anything."
    );
  } else {
    printCard(element, card, hidden, replace);

    compassHasBeenUsedThisRound = false;
    inspectHasBeenUsedThisRound = false;

    if (game.powerUpList.compass != 0) compassPowerUpsBtn.disabled = false;
    if (game.powerUpList.lightning != 0) lightningPowerUpsBtn.disabled = false;
    if (game.powerUpList.quick_inspect != 0)
      inspectPowerUpsBtn.disabled = false;

    if (game.deck.length == 0) {
      compassPowerUpsBtn.disabled = true;
      inspectPowerUpsBtn.disabled = true;
    }

    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    lootboxShopBtn.disabled = game.getBalance() < 150;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
}
