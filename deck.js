class Deck {
  constructor(deck) {
    this.cards = deck.cards;
    this.matchedCards = [];
    this.matches = 0;
    this.selectedCards = [];
  }

  checkMatched(player) {
    if(this.selectedCards[0].matchId === this.selectedCards[1].matchId) {
      this.matchedCards.push(this.selectedCards[0]);
      this.matchedCards.push(this.selectedCards[1]);
      this.matches++;
      this.selectedCards = [];
      return true;
    } else {
      return false;
    }
  }

  resetCards() {
    this.selectedCards = [];
    this.matchedCards = [];
    this.matches = 0;
    for (var i = 0; i < this.cards.length; i++) {
      this.cards[1].selected = false;
    }
  }

  shuffle(array) {
    var length = array.length;
    var temporaryLoc = null;
    for (var i = 0; i < array.length; i++) {
      var newIndex = Math.floor(Math.random() * length);
      length--;
      temporaryLoc = array[length];
      array[length] = array[newIndex];
      array[newIndex] = temporaryLoc;
    }
  }

};
