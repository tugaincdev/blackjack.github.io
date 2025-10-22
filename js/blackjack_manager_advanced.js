// Blackjack OOP ADVANCED

const btnShop = document.getElementById("btn-shop");
const shopMenu = document.getElementById("shop-menu");
const leaveShopBtn = document.getElementById("leave-shop-btn");
const revealHiddenShopBtn = document.getElementById("buy-shop-reveal");

const btnPowerUps = document.getElementById("btn-powerups");
const powerUpsMenu = document.getElementById("powerUps-menu");
const leavePowerUpsBtn = document.getElementById("leave-powerUps-btn");
const revealHiddenPowerUpsBtn = document.getElementById(
  "use-power-up-reveal-button"
);

console.log(revealHiddenPowerUpsBtn); // Check if it's selecting the right button

function newAdvancedGame() {
  console.log("✅ newAdvancedGame() called");

  newGame("advanced"); //still in its infancy
  game.powerUpList.revealHidden = 1; //just to test power up
  revealHiddenPowerUpsBtn.disabled = false;
  revealHiddenShopBtn.disabled = false;

  const extrasMenu = document.getElementById("extras-menu");
  extrasMenu.style.display = "block"; // make the whole thing visible

  console.log("✅ extrasMenu display set to block");
}

const sparkleEl = document.getElementById("sparkle");
const extrasToggleBtn = document.getElementById("extras-toggle");
const extrasPanel = document.getElementById("extras-panel");
const revealHiddenCount = document.getElementById("power-up-reveal-count");

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

function newGameBasicOrAdvanced() {
  if (gameVersion == "basic") {
    newGame(gameVersion); // start the actual game
  } else if (gameVersion == "advanced") {
    newAdvancedGame(); // start the actual game
  }
}

//--------------------------------------------------------

btnShop.addEventListener("click", () => {
  // Block the main game by showing the shop menu overlay
  powerUpsMenu.style.display = "none"; // hide the power ups menu
  shopMenu.style.display = "flex"; // show the shop menu
});

leaveShopBtn.addEventListener("click", () => {
  // Close the shop menu and unblock the main game
  shopMenu.style.display = "none"; // hide the shop menu
});

revealHiddenShopBtn.addEventListener("click", () => {
  // Close the shop menu and unblock the main game
  if (game.getBalance() < 10) {
    showToast("To buy this power up, you need more money."); //NEVER USED; ALSO, MAKE NEW TOAST AND TOAST METHOD
  } else {
    game.powerUpList.revealHidden++;
    revealHiddenCount.textContent = `${game.powerUpList.revealHidden}x`;
    revealHiddenPowerUpsBtn.disabled = false;
    game.money = game.money - 10;
    if (game.getBalance() < 10) {
      revealHiddenShopBtn.disabled = true;
    }
  }
});
