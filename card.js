class Cards {
  constructor(cardObj) {
    this.cardId = parseInt(cardObj.cardId);
    this.selected = false;
    this.matchId = parseInt(cardObj.matchId);
    this.matched = false;
  }

  match() {

  }

  updateSelected(deck) {
    this.selected = !this.selected;
    if (this.selected === true) {
      deck.selectedCards.push(this.cardId);
    } else {
      deck.selectedCards.splice(deck.selectedCards.indexOf(this.cardId), 1);
    }
  }

};
