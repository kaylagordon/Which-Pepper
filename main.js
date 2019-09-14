// sections
var startScreen = document.querySelector('.start-screen');
var rulesScreen = document.querySelector('.rules-screen');
var gameScreen = document.querySelector('.game-screen');
var gameOverScreen = document.querySelector('.game-over-screen');

// buttons
var startPlayButton = document.querySelector('#start-play-button');
var rulesPlayButton = document.querySelector('#rules-play-button');

// inputs
var startPlayer1Input = document.querySelector('#start-player1-input');
var startPlayer2Input = document.querySelector('#start-player2-input');

// text changes
var rulesPlayer1Name = document.querySelector('#rules-player1-name');
var rulesPlayer2Name = document.querySelector('#rules-player2-name');

// other selectors
var startErrorMessage = document.querySelector('.start-error-message');
var gameBoard = document.querySelector('#game-board');
var gameCard1 = document.querySelector('.game-card1');

// variables
var decksArr = [];

// event listeners
startPlayButton.addEventListener('click', clickStartPlayButton);
rulesPlayButton.addEventListener('click', clickRulesPlayButton);
gameBoard.addEventListener('click', clickGameBoard);

// mega functions
function clickStartPlayButton() {
  if (startPlayer1Input.value.length) {
    switchSections(startScreen, rulesScreen);
    insertNames(rulesPlayer1Name, startPlayer1Input);
    insertNames(rulesPlayer2Name, startPlayer2Input);
  } else {
    showErrorMessage(startErrorMessage);
  }
};

function clickRulesPlayButton() {
  switchSections(rulesScreen, gameScreen);
  instantiateCards();
};

function clickGameBoard() {
  if (event.target.parentNode.classList.contains('game-card')) {
    flipCard(event);
  }
  callUpdateSelected(event);
};

//functions
function instantiateCards() {
  var gameCards = document.querySelectorAll('.game-card');
  var cardsArr = [];
  for (var i = 0; i < gameCards.length; i++) {
    var card = new Cards({cardId: gameCards[i].dataset.id, matchId: gameCards[i].dataset.matchid});
    cardsArr.push(card);
  }
  var deck = new Deck({cards: cardsArr});
  decksArr = deck;
};

function flipCard(event) {
  if (event.target.parentNode.classList.contains('pic-showing')) {
    event.target.src = 'images/letter-p.png';
  } else {
    event.target.src = event.target.parentNode.dataset.src;
  }
  event.target.parentNode.classList.toggle('pic-showing');
};

function switchSections(hide, show) {
  hide.classList.add('hide');
  show.classList.remove('hide');
};

function insertNames(text, input) {
  var capitalName = input.value.toUpperCase();
  text.innerText = capitalName;
};

function showErrorMessage(errorText) {
  errorText.classList.remove('hide');
};

function callUpdateSelected(event) {
  for (var i = 0; i < decksArr.cards.length; i++) {
    if (parseInt(event.target.parentNode.dataset.id) == decksArr.cards[i].cardId) {
      decksArr.cards[i].updateSelected();
    }
  }
};
