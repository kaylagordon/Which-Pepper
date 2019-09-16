class Deck {
  constructor(deckObj) {
    this.cards = deckObj.cards;
    this.matchedCards = [];
    this.matches = 0;
    this.selectedCards = [];
  }

  checkMatched() {
    if(this.selectedCards[0].matchId === this.selectedCards[1].matchId) {
      console.log(11);
      this.matchedCards.push(this.selectedCards[0]);
      this.matchedCards.push(this.selectedCards[1]);
      // this.selectedCards[0].matched = true;
      // this.selectedCards[1].matched = true;
      this.matches++;
      this.selectedCards = [];
      return true;
    } else {
      return false;
    }
  }

  resetCards() {
    // for (var i = 0; i< this.cards.length; i++) {
      this.cards[i].selected = false;
      // this.cards[i].matched = false;
    // }
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
