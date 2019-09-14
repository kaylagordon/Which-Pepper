class Cards {
  constructor(cardObj) {
    this.cardId = parseInt(cardObj.cardId);
    this.selected = false;
    this.matchId = parseInt(cardObj.matchId);
    this.matched = false;
  }

  match() {

  }

  updateSelected() {
    this.selected = !this.selected;
  }

};
