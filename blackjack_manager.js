// Blackjack OOP

let game = null; // Stores the current instance of the game

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
function clearPage() {}

//TODO: Complete this method.
/**
 * Starts a new game of Blackjack.
 */
function newGame() {
  game = new Blackjack(); // Creates a new instance of the Blackjack game
  debug(game); // Displays the current state of the game for debugging
  console.log("Newgame resulta");
  dealerNewCard();
  printCard(
    document.getElementById("dealer"),
    game.dealerCards[0],
    (replace = false)
  );

  dealerNewCard(); //MISSING: VOLTADA PARA BAIXO
  printCard(
    document.getElementById("dealer"),
    new Card(game.dealerCards[1].suit, 0),
    (replace = false)
  );
  playerNewCard();
  playerNewCard();
  buttonsInitialization();
  console.log("newgame finish");
  debug(game);
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
 * @returns {Object} - The game state after the dealer's move.
 */
function dealerNewCard() {
  console.log("dealer return?");
  debug(game);
  return game.dealerMove() & debug(game);
}

//TODO: Implement this method.
/**
 * Causes the player to draw a new card.
 * @returns {Object} - The game state after the player's move.
 */
function playerNewCard() {
  console.log("player return?");
  debug(game);
  return game.playerMove() & debug(game);
}

function dealerFinish() {
  console.log("Dealer finish start");
  let state = game.getGameState();

  game.dealerTurn = true;

  while (!state.gameEnded) {
    updateDealer(state);
    debug(game);

    let dealerValue = game.getCardsValue(game.dealerCards);
    while (dealerValue < 21) {
      // Re-evaluate here on each check
      console.log("Dealer hits: current value =", dealerValue);
      dealerNewCard(true);
      debug(game);

      dealerValue = game.getCardsValue(game.dealerCards);

      if (dealerValue > 25) {
        console.log("Dealer busts at", dealerValue);
      } else {
        console.log("Dealer stands at", dealerValue);
      }
    }

    console.log("Dealer stands at", dealerValue);
    state = game.getGameState();
    debug(game);
  }
}

/**
 * Prints the card in the graphical interface.
 * @param {HTMLElement} element - The element where the card will be displayed.
 * @param {Card} card - The card to be displayed.
 * @param {boolean} [replace=false] - Indicates whether to replace the existing image.
 */
function printCard(element, card, replace = false) {
  const cardName = card.printName();

  // Construct the image path: e.g., 'img/svg/2_of_clubs.svg' or 'img/svg/ace_of_clubs.svg'
  let imagePath = `./img/svg/${cardName}.svg`;

  if (card.value == 0) {
    imagePath = `./img/svg/card_back.svg`;
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
