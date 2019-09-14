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
var player1Text = document.querySelectorAll('.player1-text');
var player2Text = document.querySelectorAll('.player2-text');
var gameAsidePlayer1MatchesNumber = document.querySelector('#game-aside-player1-matches-number');

// other selectors
var startErrorMessage = document.querySelector('.start-error-message');
var gameBoard = document.querySelector('#game-board');
var gameCards = document.querySelectorAll('.game-card');

// global non-qs variables
var decksArr = null;

// event listeners
startPlayButton.addEventListener('click', clickStartPlayButton);
rulesPlayButton.addEventListener('click', clickRulesPlayButton);
gameBoard.addEventListener('click', clickGameBoard);

// mega functions
function clickStartPlayButton() {
  if (startPlayer1Input.value.length) {
    switchSections(startScreen, rulesScreen);
    insertNames(player1Text, startPlayer1Input);
    insertNames(player2Text, startPlayer2Input);
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
    flipCardPic(event);
  }
};

//functions
function instantiateCards() {
  var cardsArr = [];
  for (var i = 0; i < gameCards.length; i++) {
    var card = new Cards({cardId: gameCards[i].dataset.id, matchId: gameCards[i].dataset.matchid});
    cardsArr.push(card);
  }
  var deck = new Deck({cards: cardsArr});
  decksArr = deck;
};

function flipCardPic(event) {
  if (event.target.parentNode.classList.contains('pic-showing')) {
    event.target.src = 'images/letter-p.png';
    event.target.parentNode.classList.toggle('pic-showing');
    callUpdateSelected(event);
  } else if (decksArr.selectedCards.length < 2){
    event.target.src = event.target.parentNode.dataset.src;
    event.target.parentNode.classList.toggle('pic-showing');
    callUpdateSelected(event);
  }
};

function switchSections(hide, show) {
  hide.classList.add('hide');
  show.classList.remove('hide');
};

function insertNames(text, input) {
  for (var i = 0; i < text.length; i++) {
    var capitalName = input.value.toUpperCase();
    text[i].innerText = capitalName;
  }
};

function showErrorMessage(errorText) {
  errorText.classList.remove('hide');
};

function callUpdateSelected(event) {
  for (var i = 0; i < decksArr.cards.length; i++) {
    if (parseInt(event.target.parentNode.dataset.id) === decksArr.cards[i].cardId) {
      decksArr.cards[i].updateSelected(decksArr);
    }
  }
};

function hideMatched(match) {
  for (var i = 0; i < gameCards.length; i++) {
    if (parseInt(gameCards[i].dataset.matchid) === match) {
      gameCards[i].classList.add('hide-card');
    }
  }
  gameAsidePlayer1MatchesNumber.innerText = decksArr.matches;
  if (decksArr.matches === 5) {
    switchSections(gameScreen, gameOverScreen);
  }
};
