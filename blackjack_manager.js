// Blackjack OOP

let game = null; // Stores the current instance of the game

/**
 * Function to debug and display the state of the game object.
 * @param {Object} obj - The object to be debugged.
 */
function debug(obj) {
    document.getElementById('debug').innerHTML = JSON.stringify(obj); // Displays the state of the object as JSON
}

/**
 * Initializes the game buttons.
 */
function buttonsInitialization() {
    document.getElementById('card').disabled = false; // Enables the button to draw a card
    document.getElementById('stand').disabled = false; // Enables the button to stand
    document.getElementById('new_game').disabled = true; // Disables the button for a new game
}

/**
 * Finalizes the buttons after the game ends.
 */
function finalizeButtons() {
    //TODO: Reveal the dealer's hidden card if you hid it like you were supposed to.

    document.getElementById('card').disabled = true; // Disables the button to draw a card
    document.getElementById('stand').disabled = true; // Disables the button to stand
    document.getElementById('new_game').disabled = false; // Enables the button for a new game
}

//TODO: Implement this method.
/**
 * Clears the page to start a new game.
 */
function clearPage() {

}

//TODO: Complete this method.
/**
 * Starts a new game of Blackjack.
 */
function newGame() {
    game = new Blackjack(); // Creates a new instance of the Blackjack game
    debug(game); // Displays the current state of the game for debugging

    dealerNewCard();
    dealerNewCard();    //MISSING: VOLTADA PARA BAIXO
    playerNewCard();
    buttonsInitialization();
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
    }
    else {
      string += "      |     The dealer lost!";
    
    }
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
      }
      else {
        string += "      |     You (the player) lost!";
      }
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
    return game.dealerMove();
}

//TODO: Implement this method.
/**
 * Causes the player to draw a new card.
 * @returns {Object} - The game state after the player's move.
 */
function playerNewCard() {
    return game.playerMove();
}

//TODO: Implement this method.
/**
 * Finishes the dealer's turn.
 */
function dealerFinish() {
    state = game.getGameState();
    
    game.dealerTurn = true;
    
    while (!state.gameEnded) {
    
        updateDealer;
    
    
        dealerValue = game.getCardsValue(game.dealerCards);
        playerValue = game.getCardsValue(game.playerCards);
        if (!((dealerValue>=21)||(dealerValue>=playerValue))) {
            dealerNewCard();
        }
        state = game.getGameState();
    }
    
    finalScore();
}

//TODO: Implement this method.
/**
 * Prints the card in the graphical interface.
 * @param {HTMLElement} element - The element where the card will be displayed.
 * @param {Card} card - The card to be displayed.
 * @param {boolean} [replace=false] - Indicates whether to replace the existing image.
 */
function printCard(element, card, replace = false) {

}

