// sections
var gameOverScreen = document.querySelector('.game-over-screen');
var gameScreen = document.querySelector('.game-screen');
var rulesScreen = document.querySelector('.rules-screen');
var startScreen = document.querySelector('.start-screen');

// buttons
var newGameButton = document.querySelector('#new-game-button');
var rulesPlayButton = document.querySelector('#rules-play-button');
var startPlayButton = document.querySelector('#start-play-button');

// inputs
var startPlayer1Input = document.querySelector('#start-player1-input');
var startPlayer2Input = document.querySelector('#start-player2-input');

// text changes
var gameAsidePlayer1MatchesNumber = document.querySelector('#game-aside-player1-matches-number');
var player1Text = document.querySelectorAll('.player1-text');
var player2Text = document.querySelectorAll('.player2-text');
var timerMinutes = document.querySelector('#timer-minutes');
var timerSeconds = document.querySelector('#timer-seconds');

// other selectors
var gameBoard = document.querySelector('#game-board');
var gameCards = document.querySelectorAll('.game-card');
var startErrorMessage = document.querySelector('.start-error-message');

// global non-qs variables
var decksArr = null;
var picSrc = ['images/card-pic5.jpg', 'images/card-pic1.jpg', 'images/card-pic2.jpg', 'images/card-pic1.jpg', 'images/card-pic3.jpg', 'images/card-pic2.jpg', 'images/card-pic4.jpg', 'images/card-pic5.jpg', 'images/card-pic3.jpg', 'images/card-pic4.jpg'];
var timeEnd = null;
var timeStart = null;
var totalTime = null;

// event listeners
gameBoard.addEventListener('click', clickGameBoard);
newGameButton.addEventListener('click', clickNewGameButton);
rulesPlayButton.addEventListener('click', clickRulesPlayButton);
startPlayButton.addEventListener('click', clickStartPlayButton);

// mega functions
function clickGameBoard() {
  if (event.target.parentNode.classList.contains('game-card') && decksArr.selectedCards.length < 2) {
    flipCardPic(event);
  }
};

function clickNewGameButton() {
  switchSections(gameOverScreen, startScreen);
  clearInputs();
  showCards();
};

function clickRulesPlayButton() {
  switchSections(rulesScreen, gameScreen);
  instantiateCards();
  startTimer();
};

function clickStartPlayButton() {
  if (startPlayer1Input.value.length) {
    switchSections(startScreen, rulesScreen);
    insertNames(player1Text, startPlayer1Input);
    insertNames(player2Text, startPlayer2Input);
  } else {
    showErrorMessage(startErrorMessage);
  }
};

//functions
function calculateTime() {
  timeEnd = Date.now();
  totalTime = (timeEnd - timeStart)/1000;
  totalMinutes = Math.round(totalTime/60);
  totalSeconds = Math.round(totalTime%60);
  logTime();
};

function callMethods(event) {
  for (var i = 0; i < decksArr.cards.length; i++) {
    if (parseInt(event.target.parentNode.dataset.id) === decksArr.cards[i].cardId) {
      decksArr.cards[i].updateSelected(decksArr);
    }
  }
  if (decksArr.selectedCards.length === 2) {
    hideMatched(event);
  }
};

function clearInputs() {
  startPlayer1Input.value = '';
  startPlayer2Input.value = '';
};

function flipCardPic(event) {
  event.target.src = decksArr.cards[event.target.parentNode.dataset.id].matchId;
  event.target.parentNode.classList.add('flipped');
  // rotate
  callMethods(event);
};

function flipCardBack(event) {
  for (var i = 0; i < gameCards.length; i++) {
    if (gameCards[i].classList.contains('flipped')) {
      gameCards[i].classList.remove('flipped');
      gameCards[i].children[0].src = 'images/letter-p.png';
    }
  }
  decksArr.selectedCards = [];
};

function hideCard(event) {
  event.target.classList.add('hide-card');
}

function hideMatched(event) {
  var isMatch = decksArr.checkMatched();
  if (isMatch) {
    console.log('match');
  //   for (var i = 0; i < gameCards.length; i++) {
    //   if (parseInt(gameCards[i].dataset.id) === card1 || parseInt(gameCards[i].dataset.id) === card2) {

    //   }
    // }
    setTimeout(function() {
      hideCard(event)
    }, 1000);
    gameAsidePlayer1MatchesNumber.innerText = decksArr.matches;
  } else {
    setTimeout(function() {
      flipCardBack(event)
    }, 3000);
  }
  if (decksArr.matches === 5) {
    calculateTime();
    switchSections(gameScreen, gameOverScreen);
    decksArr.shuffle(picSrc);
  }
};

function insertNames(text, input) {
  for (var i = 0; i < text.length; i++) {
    var capitalName = input.value.toUpperCase();
    text[i].innerText = capitalName;
  }
};

function instantiateCards() {
  var cardsArr = [];
  for (var i = 0; i < gameCards.length; i++) {
    var card = new Cards({cardId: gameCards[i].dataset.id, matchId: picSrc[i]});
    cardsArr.push(card);
  }
  var deck = new Deck({cards: cardsArr});
  decksArr = deck;
};

function logTime() {
  timerMinutes.innerText = totalMinutes;
  timerSeconds.innerText = totalSeconds;
};

function showCards() {
  for (var i = 0; i < gameCards.length; i++) {
    gameCards[i].classList.remove('hide-card');
    event.target.parentElement.parentElement.parentElement.parentElement.children[2].children[1].children[i].children[0].src = 'images/letter-p.png';
    gameCards[i].classList.toggle('pic-showing');
  }
};

function showErrorMessage(errorText) {
  errorText.classList.remove('hide');
};

function startTimer() {
  timeStart = Date.now();
};

function switchSections(hide, show) {
  hide.classList.add('hide');
  show.classList.remove('hide');
};
