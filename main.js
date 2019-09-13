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

// other variables
var startErrorMessage = document.querySelector('.start-error-message');
var gameBoard = document.querySelector('#game-board');
var gameCard1 = document.querySelector('.game-card1');
var decks = [];

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
  if (event.target.parentNode.classList.contains('match1')) {
    flipCard(event, 'images/card-pic1.jpg');
  }
  if (event.target.parentNode.classList.contains('match2')) {
    flipCard(event, 'images/card-pic2.jpg');
  }
  if (event.target.parentNode.classList.contains('match3')) {
    flipCard(event, 'images/card-pic3.jpg');
  }
  if (event.target.parentNode.classList.contains('match4')) {
    flipCard(event, 'images/card-pic4.jpg');
  }
  if (event.target.parentNode.classList.contains('match5')) {
    flipCard(event, 'images/card-pic5.jpg');
  }
};

//functions
function instantiateCards() {
  var gameCards = document.querySelectorAll('.game-card');
  var cardsArr = [];
  for (var i = 0; i < gameCards.length; i++) {
    console.log(gameCards[i].dataset.id);
    var card = new Cards({matchId: gameCards[i].dataset.id});
    console.log(card);
    cardsArr.push(card);
  }
  var deck = new Deck({cards: cardsArr});
  decks.push(deck);
  console.log(deck);
};

function flipCard(event, pic) {
  if (event.target.parentNode.classList.contains('pic-showing')) {
    event.target.src = 'images/letter-p.png';
  } else {
    event.target.src = pic;
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
