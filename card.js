class Cards {
  constructor(card) {
    this.cardId = parseInt(card.cardId);
    this.matchId = card.matchId;
    this.selected = false;
  }

  updateSelected(deck) {
    this.selected = !this.selected;
    if (this.selected === true) {
      deck.selectedCards.push(this);
    } else {
      deck.selectedCards.splice(deck.selectedCards.indexOf(this), 1);
    }
  }

};
