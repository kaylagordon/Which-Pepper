class Cards {
  constructor(cardObj) {
    this.cardId = parseInt(cardObj.cardId);
    this.matchId = cardObj.matchId;
    // this.matched = false;
    this.selected = false;
  }

  updateSelected(deck) {
    this.selected = !this.selected;
    if (this.selected === true) {
      deck.selectedCards.push(this);
    } else {
      deck.selectedCards.splice(deck.selectedCards.indexOf(this), 1);
    }
    if(deck.selectedCards.length === 2) {
      deck.checkMatched();
    }
  }

};
