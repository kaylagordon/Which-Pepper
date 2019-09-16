class Deck {
  constructor(deckObj) {
    this.cards = deckObj.cards;
    this.matchedCards = [];
    this.matches = 0;
    this.selectedCards = [];
  }

  checkMatched() {
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
      this.cards[i].selected = false;
      this.selectedCards = [];
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
    // this.resetCards();
  }

};
