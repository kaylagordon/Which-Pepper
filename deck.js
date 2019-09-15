class Deck {
  constructor(deckObj) {
    this.cards = deckObj.cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

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

};
