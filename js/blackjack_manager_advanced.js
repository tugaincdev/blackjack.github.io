// Blackjack OOP ADVANCED

const btnShop = document.getElementById("btn-shop");
const shopMenu = document.getElementById("shop-menu");
const leaveShopBtn = document.getElementById("leave-shop-btn");
const revealHiddenShopBtn = document.getElementById("buy-shop-reveal");
//---------------------------------------------
const compassShopBtn = document.getElementById("buy-shop-compass");
const lightningShopBtn = document.getElementById("buy-shop-lightning");
const inspectShopBtn = document.getElementById("buy-shop-quick-inspect");

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

revealHiddenPowerUpsBtn.addEventListener("click", () => {
  // Close the power ups menu and unblock the main game
  if (game.powerUpList.revealHidden == 0) {
    showToast("To use this power up, you need to buy it in the shop."); //THIS IS NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    if (!game.dealerTurn) {
      const hiddenCard = document.getElementById("dealer").lastElementChild;
      if (hiddenCard) {
        let cardToAddName = game.dealerCards[1].printName();
        hiddenCard.src = `./images/svg/${cardToAddName}.svg`;

        game.powerUpList.revealHidden--;
        if (game.powerUpList.revealHidden == 0) {
          revealHiddenPowerUpsBtn.disabled = true;
          console.log("disabled reveal power up bc count == 0");
        }
        //change "0x" text to revealHidden value
        if (revealHiddenCount) {
          revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;
        }

        powerUpsMenu.style.display = "none"; // hide the power ups menu
      }
    }
  }
});

compassPowerUpsBtn.addEventListener("click", () => {
  // Close the power ups menu and unblock the main game
  if (!game.dealerTurn) {
    let nextCardOnDeck = game.deck[0];
    let playerCurrentDeck = game.playerCards;
    let playerHypotheticalDeck = [...playerCurrentDeck, nextCardOnDeck];
    let playerHypotheticalValue = game.getCardsValue(playerHypotheticalDeck);

    if (playerHypotheticalValue > 25) {
      showToast("Be careful. The next card on the deck will make you bust.");
    } else {
      showToast("At ease. The next card on the deck will not make you bust.");
    }

    game.powerUpList.compass--;

    powerUpsMenu.style.display = "none"; // hide the power ups menu
  }
  compassPowerUpsBtn.disabled = true;
});

lightningPowerUpsBtn.addEventListener("click", () => {
  // Close the power ups menu and unblock the main game
  if (!game.dealerTurn) {
    let playerCurrentDeck = game.playerCards;
    let playerCurrentCardNumber = playerCurrentDeck.length;
    let indexCardToRemove = Math.floor(Math.random() * playerCurrentCardNumber);
    let playerNewDeck = [];

    //add smth visually maybe of card being destroyed

    for (let i = 0; i <= playerCurrentCardNumber; i++) {
      if (i != indexCardToRemove) {
        playerNewDeck[i] = playerCurrentDeck[i];
      }
    }
    powerUpsMenu.style.display = "none"; // hide the power ups menu

    //MISSING: VISUALLY, ALSO TONS OF OTHER STUFF MAYBE

    game.powerUpList.lightning--;
    if (game.powerUpList.lightning == 0) lightningPowerUpsBtn.disabled = true;
  }
});

inspectPowerUpsBtn.addEventListener("click", () => {
  // Close the power ups menu and unblock the main game
  if (!game.dealerTurn) {
    let nextCardOnDeck = game.deck[0];
    powerUpsMenu.style.display = "none"; // hide the power ups menu

    //MISSING: display nextCardOnDeck on its own defutly hidden menu like main menu

    game.powerUpList.compass--;
  }
  compassPowerUpsBtn.disabled = true;
});

//-----------------------------------------

revealHiddenShopBtn.addEventListener("click", () => {
  if (game.getBalance() < 10) {
    showToast("To buy this power up, you need more money."); //NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    game.powerUpList.revealHidden++;
    revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;
    revealHiddenPowerUpsBtn.disabled = false;
    game.money = game.money - 10;
    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
});

compassShopBtn.addEventListener("click", () => {
  if (game.getBalance() < 50) {
    showToast("To buy this power up, you need more money."); //NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    game.powerUpList.compass++;
    compassCount.textContent = `${game.powerUpList.compass}x`;
    compassPowerUpsBtn.disabled = false;
    game.money = game.money - 50;
    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
});

lightningShopBtn.addEventListener("click", () => {
  if (game.getBalance() < 100) {
    showToast("To buy this power up, you need more money."); //NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    game.powerUpList.lightning++;
    lightningCount.textContent = `${game.powerUpList.lightning}x`;
    lightningPowerUpsBtn.disabled = false;
    game.money = game.money - 100;
    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
});

inspectShopBtn.addEventListener("click", () => {
  if (game.getBalance() < 300) {
    showToast("To buy this power up, you need more money."); //NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    game.powerUpList.quick_inspect++;
    inspectCount.textContent = `${game.powerUpList.quick_inspect}x`;
    inspectPowerUpsBtn.disabled = false;
    game.money = game.money - 300;
    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
});

function newGameBasicOrAdvanced() {
  revealHasBeenUsedThisRound = false;

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

let revealHasBeenUsedThisRound = false;

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

    if (!(game.powerUpList.revealHidden == 0))
      revealHiddenPowerUpsBtn.disabled = false;
    if (!(game.powerUpList.compass == 0)) compassPowerUpsBtn.disabled = false;
    if (!(game.powerUpList.lightning == 0))
      lightningPowerUpsBtn.disabled = false;
    if (!(game.powerUpList.quick_inspect == 0))
      inspectPowerUpsBtn.disabled = false;

    if (game.deck.length == 0) {
      compassPowerUpsBtn.disabled = true;
      inspectPowerUpsBtn.disabled = true;
    }

    revealHiddenShopBtn.disabled = game.getBalance() < 10;
    compassShopBtn.disabled = game.getBalance() < 50;
    lightningShopBtn.disabled = game.getBalance() < 100;
    inspectShopBtn.disabled = game.getBalance() < 300;
  }
}
