// Blackjack object

/**
 * Class that represents the Blackjack game.
 */
class Blackjack {
  // Constant that defines the maximum points to avoid busting in Blackjack
  static MAX_POINTS = 25;
  // Constant that defines the point threshold at which the dealer must stand
  static DEALER_MAX_TURN_POINTS = 21;

  /**
   * Creates an instance of Blackjack and initializes the deck.
   * @param {number} initialMoney - The starting money for the player.
   */
  constructor(initialMoney = 10000) {
    this.dealerCards = []; // Dealer's cards
    this.playerCards = []; // Player's cards
    this.dealerTurn = false; // Flag for dealer's turn

    // State of the game
    this.state = {
      gameEnded: false,
      playerWon: false,
      dealerWon: false,
      playerBusted: false,
      dealerBusted: false,
    };

    // 💰 Money system
    this.money = initialMoney; // Starting balance
    this.currentBet = 0; // Current round bet

    // Initialize the deck
    this.deck = this.shuffle(this.newDeck());
  }

  /**
   * Creates a new deck of 52 cards.
   * @returns {Card[]} - A new deck.
   */
  newDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const deck = [];
    for (let suit of suits) {
      for (let value = 1; value <= 13; value++) {
        deck.push(new Card(suit, value));
      }
    }
    return deck;
  }

  /**
   * Shuffles the deck using the Fisher–Yates algorithm.
   * @param {Card[]} deck - The deck of cards.
   * @returns {Card[]} - Shuffled deck.
   */
  shuffle(deck) {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  }

  getDealerCards() {
    return this.dealerCards.slice();
  }

  getPlayerCards() {
    return this.playerCards.slice();
  }

  setDealerTurn(val) {
    this.dealerTurn = val;
  }

  /**
   * Calculates the total value of a hand of cards.
   * @param {Card[]} cards - The cards to evaluate.
   * @returns {number} - Total value of the cards.
   */
  getCardsValue(cards) {
    let valor = 0;
    let numAces = 0;

    cards.forEach((item) => {
      switch (item.value) {
        case 1:
          valor += 1;
          numAces++;
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          valor += item.value;
          break;
        default:
          valor += 10;
          break;
      }
    });

    while (numAces > 0 && valor + 10 <= Blackjack.MAX_POINTS) {
      valor += 10;
      numAces--;
    }

    return valor;
  }

  /**
   * Dealer draws a card.
   * @param {boolean} hidden - Whether to hide the card.
   * @returns {Object} - Updated game state.
   */
  dealerMove(hidden = false) {
    if (this.deck.length === 0) return this.getGameState();
    let cardToAdd = this.deck[0];
    this.deck.shift();
    this.dealerCards.push(cardToAdd);

    basicOrAdvancedPrintCard(
      document.getElementById("dealer"),
      game.dealerCards[game.dealerCards.length - 1],
      hidden
    );

    return this.getGameState();
  }

  /**
   * Player draws a card.
   * @returns {Object} - Updated game state.
   */
  playerMove() {
    if (this.deck.length === 0) return this.getGameState();
    let cardToAdd = this.deck[0];
    this.deck.shift();
    this.playerCards.push(cardToAdd);

    basicOrAdvancedPrintCard(
      document.getElementById("player"),
      game.playerCards[game.playerCards.length - 1]
    );

    return this.getGameState();
  }

  /**
   * Evaluates the current state of the game.
   * @returns {Object} - Current game state.
   */
  getGameState() {
    const playerValue = this.getCardsValue(this.playerCards);
    const dealerValue = this.getCardsValue(this.dealerCards);

    // Reset state
    this.state = {
      gameEnded: false,
      playerWon: false,
      dealerWon: false,
      playerBusted: false,
      dealerBusted: false,
    };

    if (playerValue > Blackjack.MAX_POINTS) {
      this.state.gameEnded = true;
      this.state.playerBusted = true;
      this.state.dealerWon = true;
    } else if (dealerValue > Blackjack.MAX_POINTS) {
      this.state.gameEnded = true;
      this.state.dealerBusted = true;
      this.state.playerWon = true;
    } else if (this.dealerTurn) {
      this.state.gameEnded = true;
      if (playerValue > dealerValue) {
        this.state.playerWon = true;
      } else if (dealerValue > playerValue) {
        this.state.dealerWon = true;
      }
    } else if (playerValue === Blackjack.MAX_POINTS) {
      this.state.gameEnded = true;
      this.state.playerWon = true;
    }

    return { ...this.state };
  }

  /**
   * Updates the remaining deck.
   */
  updateDeck() {
    return this.deck;
  }

  // ====================================================
  // 💰 MONEY SYSTEM METHODS
  // ====================================================

  /**
   * Player places a bet.
   * @param {number} amount - The bet amount.
   * @returns {boolean} - True if valid bet, false otherwise.
   */
  placeBet(amount) {
    if (amount > this.money || amount <= 0) {
      alert("Invalid bet amount!");
      return false;
    }
    this.currentBet = amount;
    this.money -= amount;
    return true;
  }

  /**
   * Applies the result of a bet (win, lose, or tie).
   * @param {"win"|"lose"|"tie"} result - The outcome of the round.
   */
  applyBetResult(result) {
    if (result === "win") {
      this.money += this.currentBet * 2; // Double the bet
    } else if (result === "tie") {
      this.money += this.currentBet; // Return the bet
    }
    this.currentBet = 0;
  }

  /**
   * Returns the player's current balance.
   * @returns {number}
   */
  getBalance() {
    return this.money;
  }
}
