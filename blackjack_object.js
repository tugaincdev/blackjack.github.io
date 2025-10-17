
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
     */
    constructor() {
        this.dealerCards = []; // Array to hold the dealer's cards
        this.playerCards = []; // Array to hold the player's cards
        this.dealerTurn = false; // Flag to indicate if it's the dealer's turn to play

        // State of the game with information about the outcome
        this.state = {
            gameEnded: false, // Indicates whether the game has ended
            playerWon: false, // Indicates if the player has won
            dealerWon: false, // Indicates if the dealer has won
            playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
            dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
        };

        // Initialize the deck of cards
        this.deck = this.shuffle(this.newDeck()); // Create and shuffle a new deck
    }

     newDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const deck = [];
        for(let suit of suits){
            for (let value = 1; value <= 13; value++) {
            deck.push(new Card(suit, value)); 
        }
      }
        return deck;
    }

    //TODO: Implement this method
    /**
     * Shuffles the deck of cards.
     * @param {Card[]} deck - The deck of cards to be shuffled.
     * @returns {Card[]} - The shuffled deck.
     */
    shuffle(deck) {
        const posArray = [];
        const newDeck = [];
        
        for (let i=52; i>0;i--) {
            posArray.push(i);
        }

        for (var pos in posArray) {
            let cardRef = Math.floor(Math.random() * 52);
            newDeck[pos] = deck[cardRef];
        }

        return newDeck;
    }

    getDealerCards() {
        return this.dealerCards.slice(); // Return a copy of the dealer's cards
    }


    getPlayerCards() {
        return this.playerCards.slice(); // Return a copy of the player's cards
    }


    setDealerTurn(val) {
        this.dealerTurn = val; // Update the dealer's turn status
    }

   getCardsValue(cards) {
    let valor = 0;
    let numAces = 0;

    cards.forEach(contar);

    function contar(item) {
        switch (item.value) {
            case 1:  
                valor += 1;
                numAces++;
                break;
            case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
                valor += item.value; 
                break;
            default:  // 11,12,13 = 10
                valor += 10;
                break;
        }
    }

    
    while (numAces > 0 && valor + 10 <= Blackjack.MAX_POINTS) {
        valor += 10;
        numAces--;
    }

    return valor;
}
    dealerMove() {


        let cardToAdd = this.deck[1];
        this.updateDeck;
        
        this.dealerCards.push(cardToAdd);

        return this.getGameState;
    }

  
    playerMove() {

        
        let cardToAdd = this.deck[1];
        this.updateDeck;
       
        
        this.playerCards.push(cardToAdd);

        return this.getGameState;

    }

  
    getGameState() {

        if (this.getCardsValue(this.playerCards) > 25) {
            this.state = {
                gameEnded: true, // Indicates whether the game has ended
                playerWon: false, // Indicates if the player has won
                dealerWon: true, // Indicates if the dealer has won
                playerBusted: true, // Indicates if the player has exceeded MAX_POINTS
                dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
            };
        } else if (this.getCardsValue(this.playerCards) = 25) {
            this.state = {
                gameEnded: true, // Indicates whether the game has ended
                playerWon: true, // Indicates if the player has won
                dealerWon: false, // Indicates if the dealer has won
                playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
                dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
            };
        } else if (this.getCardsValue(this.dealerCards) > 25) {
            this.state = {
                gameEnded: true, // Indicates whether the game has ended
                playerWon: true, // Indicates if the player has won
                dealerWon: false, // Indicates if the dealer has won
                playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
                dealerBusted: true // Indicates if the dealer has exceeded MAX_POINTS
            };
        } else if (this.getCardsValue(this.dealerCards) = 25) {
            this.state = {
                gameEnded: true, // Indicates whether the game has ended
                playerWon: false, // Indicates if the player has won
                dealerWon: true, // Indicates if the dealer has won
                playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
                dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
            };
        }

        return this.state;
        
    }

    updateDeck() {
        //move all cards in this.deck to left (used after one card is removed from deck)

        const updatedDeck = [];
        
        for (let i=1; i>52; i++) {
            updatedDeck(i) = this.deck(i+1)
        }

        this.deck = updatedDeck;
        return;
    }
}
