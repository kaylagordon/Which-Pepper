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
      this.selectedCards[0].matched = true;
      this.selectedCards[1].matched = true;
      this.matches++;
      hideMatched(this.selectedCards[0].cardId, this.selectedCards[1].cardId);
      this.selectedCards = [];
    }
  }

  resetCards() {
    for (var i = 0; i< this.cards.length; i++) {
      this.cards[i].selected = false;
      this.cards[i].matched = false;
    }
  }

  shuffle() {
    var length = picSrc.length;
    var temporaryLoc = null;
    for (var i = 0; i < picSrc.length; i++) {
      var newIndex = Math.floor(Math.random() * length);
      length--;
      temporaryLoc = picSrc[length];
      picSrc[length] = picSrc[newIndex];
      picSrc[newIndex] = temporaryLoc;
    }
    this.resetCards();
  }

};
