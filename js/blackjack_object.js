
class Blackjack {
 
  static MAX_POINTS = 25;

  static DEALER_MAX_TURN_POINTS = 21;

 
  constructor(initialMoney = 1000) {
    this.dealerCards = []; 
    this.playerCards = []; 
    this.dealerTurn = false; 

   
    this.state = {
      gameEnded: false,
      playerWon: false,
      dealerWon: false,
      playerBusted: false,
      dealerBusted: false,
    };

    
    this.money = initialMoney; 
    this.currentBet = 0; // Current round bet

  
    this.deck = this.shuffle(this.newDeck());
  }

 
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

  getGameState() {
    const playerValue = this.getCardsValue(this.playerCards);
    const dealerValue = this.getCardsValue(this.dealerCards);


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


  updateDeck() {
    return this.deck;
  }


  placeBet(amount) {
    if (amount > this.money || amount <= 0) {
      alert("Invalid bet amount!");
      return false;
    }
    this.currentBet = amount;
    this.money -= amount;
    return true;
  }


  applyBetResult(result) {
    if (result === "win") {
      this.money += this.currentBet * 2; 
    } else if (result === "tie") {
      this.money += this.currentBet; 
    }
    this.currentBet = 0;
  }


  getBalance() {
    return this.money;
  }
}
