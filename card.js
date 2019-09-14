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
      deck.selectedCards.push(this);
    } else {
      deck.selectedCards.splice(deck.selectedCards.indexOf(this), 1);
    }
    if(deck.selectedCards.length === 2) {
      deck.checkSelectedCards();
    }
  }

};
