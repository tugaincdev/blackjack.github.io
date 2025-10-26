

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

  // Hide after 2 seconds
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


function debug(obj) {
  document.getElementById("debug").innerHTML = `<pre>${JSON.stringify(
    obj,
    null,
    2
  )}</pre>`;
}


function buttonsInitialization() {
  document.getElementById("card").disabled = false; // Enables the button to draw a card
  document.getElementById("stand").disabled = false; // Enables the button to stand
  document.getElementById("new_game").disabled = true; // Disables the button for a new game
  console.log("init button finish");
}


function finalizeButtons() {
  //TODO: Reveal the dealer's hidden card if you hid it like you were supposed to.

  document.getElementById("card").disabled = true; // Disables the button to draw a card
  document.getElementById("stand").disabled = true; // Disables the button to stand
  document.getElementById("new_game").disabled = false; // Enables the button for a new game
}


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
  debug(game);
  console.log("Starting new game...");
  game.dealerCards = [];
  game.playerCards = [];
  game.dealerTurn = false;
  game.state = {
    gameEnded: false,
    playerWon: false,
    dealerWon: false,
    playerBusted: false,
    dealerBusted: false,
  };

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

function updateMoneyDisplay() {
  document.getElementById("money-display").textContent = game.money.toFixed(0);
}

function placeBetAndStart() {
  const betValue = parseInt(document.getElementById("bet-input").value);

  const preservedMoney = game ? game.money : 1000; // Adjust default as needed (e.g., 1000 starting chips)

  if (gameVersion == "basic") {
    game = new Blackjack();
  } else {
    game = new Blackjack_Advanced();
  }

  game.money = preservedMoney;

  updateMoneyDisplay();

  if (game.placeBet(betValue)) {
    updateMoneyDisplay(); // Update again to show post-bet balance
    newGameBasicOrAdvanced();
  } else {
    showToast("Insufficient funds!"); // Assuming you have this from earlier code
  }
}


function finalScore(state) {
  let playerCardsValue = game.getCardsValue(game.playerCards);
  let dealerCardsValue = game.getCardsValue(game.dealerCards);

 
}


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



  this.finalizeButtons(); //wrong?

  return;
}


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



  this.finalizeButtons(); //wrong?

  return;
}


function dealerNewCard(hidden = false) {
  console.log("After getGameObject:", game);
  console.log("Type of dealerMove:", typeof game?.dealerMove);

  console.log("dealer return?");
  debug(game);
  return game.dealerMove(hidden);
}


function playerNewCard() {
  console.log("player return?");
  debug(game);
  return game.playerMove();
}

function dealerDrawLoop(next_method) {
  let dealerValue = game.getCardsValue(game.dealerCards);
  const playerValue = game.getCardsValue(game.playerCards);


  if (dealerValue >= playerValue || dealerValue >= 21) {
    console.log("Dealer done.");
    if (typeof next_method === "function") next_method();
    return;
  }


  dealerNewCard();
  game.getGameState();

  
  playCardSoundThenWait(() => {
    dealerDrawLoop(next_method);
  });
}

function dealerFinish() {
  console.log("Dealer finish start");
  let state = game.getGameState();

  game.dealerTurn = true;

  basicOrAdvancedPrintCard(
    document.getElementById("dealer"),
    game.dealerCards[1],
    false,
    true
  );

  playRevealCardSoundThenWait(() => {
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
  });
}


function printCard(element, card, hidden = false, replace = false) {
  const cardName = card.printName();

  
  let imagePath = `./images/svg/${cardName}.svg`;

  if (hidden) {
    imagePath = `./images/svg/card_back.svg`;
  }

 
  const cardSlot = document.createElement("div");
  cardSlot.classList.add("card-slot");
  cardSlot.style.display = "inline-block";
  cardSlot.style.position = "relative";
  cardSlot.style.margin = "2px";


  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = card.printName(); 
  img.classList.add("card-image"); 
  img.style.width = "60px"; 
  img.style.height = "auto";
 

  img.style.display = "block";
  cardSlot.appendChild(img);

  if (replace && element.children.length > 0) {

    
    const lastChild = element.lastElementChild;
    if (lastChild) {
      lastChild.replaceWith(img);
      return;
    }
  }

  console.log("Image path:", imagePath);
 
  element.appendChild(cardSlot);
}

function showGameResult(message) {
  const statusEl = document.getElementById("game_status");
  statusEl.textContent = message;
  statusEl.style.fontSize = "1.5rem";
  statusEl.style.fontWeight = "bold";
  statusEl.style.textAlign = "center";
  statusEl.style.marginTop = "1rem";
}
