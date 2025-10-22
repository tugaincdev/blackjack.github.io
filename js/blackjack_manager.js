// Blackjack OOP

let gameVersion = null;
let game = null; // Stores the current instance of the game

const playerNameInput = document.getElementById("player-name");
const nameSubmitBtn = document.getElementById("btn-name-submit");

let playerName = "";
let playerNameExists = false;

function showToast(message) {
  const toast = document.getElementById("toast-message");

  toast.textContent = message;
  toast.style.opacity = "1";

  // Hide after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}

nameSubmitBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name && name.length != 0) {
    console.log("Player name entered (attempt):", name);
    playerName = name;

    playerNameInput.value = "";
    playerNameInput.blur();

    playerNameExists = true;

    playerNameDisplay.innerHTML = `<i class="bi bi-person-fill"></i> ${playerName}`;

    showToast(`Welcome, ${name}!`);

    return;
  } else {
    showToast("Please enter a name before continuing.");
    playerNameDisplay.innerHTML = `<i class="bi bi-person-fill"></i> Player`;
    playerName = "";
    playerNameExists = false;
    playerNameInput.focus();
    return;
  }
});

// Allow pressing Enter to submit
playerNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    nameSubmitBtn.click();
  }
});

/**
 * Function to debug and display the state of the game object.
 * @param {Object} obj - The object to be debugged.
 */
/**
 * Function to debug and display the state of the game object.
 * @param {Object} obj - The object to be debugged.
 */
function debug(obj) {
  document.getElementById("debug").innerHTML = `<pre>${JSON.stringify(
    obj,
    null,
    2
  )}</pre>`;
}

/**
 * Initializes the game buttons.
 */
function buttonsInitialization() {
  document.getElementById("card").disabled = false; // Enables the button to draw a card
  document.getElementById("stand").disabled = false; // Enables the button to stand
  document.getElementById("new_game").disabled = true; // Disables the button for a new game
  console.log("init button finish");
}

/**
 * Finalizes the buttons after the game ends.
 */
function finalizeButtons() {
  //TODO: Reveal the dealer's hidden card if you hid it like you were supposed to.

  document.getElementById("card").disabled = true; // Disables the button to draw a card
  document.getElementById("stand").disabled = true; // Disables the button to stand
  document.getElementById("new_game").disabled = false; // Enables the button for a new game
}

//TODO: Implement this method.
/**
 * Clears the page to start a new game.
 */
function clearPage() {
  console.log("Clearing page...");
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("player").innerHTML = "";
  document.getElementById("debug").innerHTML = "";
  document.getElementById("game_status").textContent = "";
}

function getGameObject(gameType) {
  let gameReturn = null;
  if (gameType == "basic") {
    gameVersion = "basic";
    gameReturn = new Blackjack();
  } else if (gameType == "advanced") {
    gameVersion = "advanced";
    gameReturn = new Blackjack_Advanced();
  }

  return gameReturn;
}

function newGame(gameType) {
  // When clicking Start buttons, check if name exists — if not, try to use textbox value

  if (!playerNameExists) {
    const name = playerNameInput.value.trim();
    if (name) {
      playerName = name;
      playerNameExists = true;
      playerNameDisplay.innerHTML = `<i class="bi bi-person-fill"></i> ${playerName}`;
      showToast(`Welcome, ${playerName}!`);
      playerNameInput.value = "";
      playerNameInput.blur();
    }
  }
  clearPage();
  game = getGameObject(gameType);
  debug(game);
  console.log("Starting new game...");

  // dealer first card
  dealerNewCard();
  playCardSoundThenWait(() => {
    // dealer hidden card
    dealerNewCard(true);
    playCardSoundThenWait(() => {
      // player first card
      playerNewCard();
      playCardSoundThenWait(() => {
        // player second card
        playerNewCard();
        playCardSoundThenWait(() => {
          buttonsInitialization();
          debug(game);
          console.log("Dealing done!");
        });
      });
    });
  });
}

//TODO: Implement this method.
/**
 * Calculates and displays the final score of the game.
 * @param {Object} state - The current state of the game.
 */
function finalScore(state) {
  let playerCardsValue = game.getCardsValue(game.playerCards);
  let dealerCardsValue = game.getCardsValue(game.dealerCards);

  //em HTML, display pop-up thingy; playerCardsValue on left, dealerCardsValue on right. use state parameter to check if playerBUusted; if so display playerCardsValue in red; same for other conditions and for dealer
}

//TODO: Implement this method.
/**
 * Updates the dealer's state in the game.
 * @param {Object} state - The current state of the game.
 */
function updateDealer(state) {
  let string = "";

  if (game.state.gameEnded) {
    for (let card of game.dealerCards) {
      string += card.printName() + ", ";
    }
    string = string.slice(0, -2);

    if (game.state.dealerWon) {
      string += "      |     The dealer won!";
    } else {
      string += "      |     The dealer lost!";
    }
    debug(game);
  }

  //TODO: ATUALIZAR STRING NO HTML ASSOCIADA AO PLAYER

  this.finalizeButtons(); //wrong?

  return;
}

//TODO: Implement this method.
/**
 * Updates the player's state in the game.
 * @param {Object} state - The current state of the game.
 */
function updatePlayer(state) {
  let string = "Player cards: ";
  for (let card of game.playerCards) {
    string += card.printName() + ", ";
  }
  string = string.slice(0, -2);

  if (game.state.gameEnded) {
    if (game.state.playerWon) {
      string += "      |     You (the player) won!";
    } else {
      string += "      |     You (the player) lost!";
    }
    debug(game);
  }

  //TODO: ATUALIZAR STRING NO HTML ASSOCIADA AO PLAYER

  this.finalizeButtons(); //wrong?

  return;
}

//TODO: Implement this method.
/**
 * Causes the dealer to draw a new card.
 * @param {boolean} hidden - QWEONG
 * @returns {Object} - The game state after the dealer's move.
 */
function dealerNewCard(hidden = false) {
  console.log("dealer return?");
  debug(game);
  return game.dealerMove(hidden);
}

//TODO: Implement this method.
/**
 * Causes the player to draw a new card.
 * @returns {Object} - The game state after the player's move.
 */
function playerNewCard() {
  console.log("player return?");
  debug(game);
  return game.playerMove();
}

function dealerDrawLoop(next_method) {
  let dealerValue = game.getCardsValue(game.dealerCards);
  const playerValue = game.getCardsValue(game.playerCards);

  // stop if dealer already beat or tied player, or busted
  if (dealerValue >= playerValue || dealerValue >= 21) {
    console.log("Dealer done.");
    if (typeof next_method === "function") next_method();
    return;
  }

  // draw one card
  dealerNewCard();
  game.getGameState();

  // play sound then draw next
  playCardSoundThenWait(() => {
    dealerDrawLoop(next_method);
  });
}

function dealerFinish() {
  console.log("Dealer finish start");
  let state = game.getGameState();

  game.dealerTurn = true;

  printCard(
    document.getElementById("dealer"),
    game.dealerCards[1],
    false,
    true
  );

  const playerValue = game.getCardsValue(game.playerCards);
  if (playerValue > 25) {
    console.log("Player busted! Dealer doesn’t need to play.");
    state.gameEnded = true;
    finalizeButtons();
    debug(game);
    if (playerNameExists) {
      showGameResult("💀 " + playerName + ", you lost!");
      game.applyBetResult("lose");
    } else {
      showGameResult("💀 You lost!");
      game.applyBetResult("lose");
    }
    return;
  }

  updateDealer(state);
  debug(game);

  let dealerValue = game.getCardsValue(game.dealerCards);

  console.log(
    "Player value:",
    playerValue,
    "| Dealer initial value:",
    dealerValue
  );

  if (dealerValue > playerValue && dealerValue <= 25) {
    console.log("Dealer já está acima do player. Para aqui!");
    console.log("Dealer stands at", dealerValue);

    state = game.getGameState();
    debug(game);
    if (playerNameExists) {
      showGameResult("💀 " + playerName + ", you lost!");
      game.applyBetResult("lose");
    } else {
      showGameResult("💀 You lost!");
      game.applyBetResult("lose");
    }
    return;
  }

  dealerDrawLoop(() => {
    const dealerValue = game.getCardsValue(game.dealerCards);
    console.log("Dealer final:", dealerValue, "Player:", playerValue);

    if (playerNameExists) {
      if (dealerValue > 25) {
        showGameResult("🎉 " + playerName + ", you won!");
        game.applyBetResult("win");
      } else if (dealerValue > playerValue) {
        showGameResult("💀 " + playerName + ", you lost!");
        game.applyBetResult("lose");
      } else if (dealerValue === playerValue) {
        showGameResult("🤝 " + playerName + ", you tied.");
        game.applyBetResult("tie");
      } else {
        showGameResult("🎉 " + playerName + ", you won!");
        game.applyBetResult("win");
      }
    } else {
      if (dealerValue > 25) {
        showGameResult("🎉 You won!");
        game.applyBetResult("win");
      } else if (dealerValue > playerValue) {
        showGameResult("💀 You lost!");
        game.applyBetResult("lose");
      } else if (dealerValue === playerValue) {
        showGameResult("🤝 You tied.");
        game.applyBetResult("tie");
      } else {
        showGameResult("🎉 You won!");
        game.applyBetResult("win");
      }
    }

    state = game.getGameState();
    finalizeButtons();
    debug(game);
  });
}

/**
 * Prints the card in the graphical interface.
 * @param {HTMLElement} element - The element where the card will be displayed.
 * @param {Card} card - The card to be displayed.
 * @param {boolean} hidden - QWEONG
 */
function printCard(element, card, hidden = false, replace = false) {
  const cardName = card.printName();

  // Construct the image path: e.g., 'img/svg/2_of_clubs.svg' or 'img/svg/ace_of_clubs.svg'
  let imagePath = `./images/svg/${cardName}.svg`;

  if (hidden) {
    imagePath = `./images/svg/card_back.svg`;
  }

  // Create a new img element
  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = card.printName(); // Use the card's text name for accessibility
  img.classList.add("card-image"); // Optional: Add a CSS class for styling
  img.style.width = "60px"; // Optional: Inline style for sizing; adjust as needed
  img.style.height = "auto";
  img.style.margin = "2px"; // Small margin between cards

  if (replace && element.children.length > 0) {
    // If replace is true, replace the last child (e.g., for revealing hidden card)
    const lastChild = element.lastElementChild;
    if (lastChild) {
      lastChild.replaceWith(img);
      return;
    }
  }

  console.log("Image path:", imagePath);
  // Append the image to the element
  element.appendChild(img);
}

function showGameResult(message) {
  const statusEl = document.getElementById("game_status");
  statusEl.textContent = message;
  statusEl.style.fontSize = "1.5rem";
  statusEl.style.fontWeight = "bold";
  statusEl.style.textAlign = "center";
  statusEl.style.marginTop = "1rem";
}
