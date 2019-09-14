class Deck {
  constructor(deckObj) {
    this.cards = deckObj.cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

  }

  checkSelectedCards() {
    if(this.selectedCards[0].matchId === this.selectedCards[1].matchId) {
      console.log('WOOOOO')
    }
  }

  moveToMatched() {

  }

};
