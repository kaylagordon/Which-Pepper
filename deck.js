class Deck {
  constructor(deckObj) {
    this.cards = deckObj.cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

  }

  checkMatched(match) {
    if(this.selectedCards[0].matchId === this.selectedCards[1].matchId) {
      this.matchedCards.push(this.selectedCards[0]);
      this.matchedCards.push(this.selectedCards[1]);
      this.selectedCards = [];
      this.matches++;
      hideMatched(match);
    }
  }

};
