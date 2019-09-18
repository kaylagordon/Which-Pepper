// sections
var gameOverScreen = document.querySelector('.game-over-screen');
var gameScreen = document.querySelector('.game-screen');
var rulesScreen = document.querySelector('.rules-screen');
var startScreen = document.querySelector('.start-screen');
var topPlayerBoard = document.querySelector('.top-player-board');

// buttons
var newGameButton = document.querySelector('#new-game-button');
var rulesPlayButton = document.querySelector('#rules-play-button');
var startPlayButton = document.querySelector('#start-play-button');
var topPlayerButton = document.querySelector('#top-player-button');
var popupStartButton = document.querySelector('.popup-start-button');
var rematchButton = document.querySelector('#rematch-button');

// text changes
var gameAsidePlayer1MatchesNumber = document.querySelector('#game-aside-player1-matches-number');
var gameAsidePlayer2MatchesNumber = document.querySelector('#game-aside-player2-matches-number');
var player1Text = document.querySelectorAll('.player1-text');
var player2Text = document.querySelectorAll('.player2-text');
var player1Minutes = document.querySelector('#player1-minutes');
var player1Seconds = document.querySelector('#player1-seconds');
var player2Minutes = document.querySelector('#player2-minutes');
var player2Seconds = document.querySelector('#player2-seconds');
var topPlayerNames = document.querySelectorAll('.top-player-name');
var topPlayerTimes = document.querySelectorAll('.top-player-time');
var popupPlayerText = document.querySelector('.popup-player-text');
var winnerText = document.querySelector('.winner-text');

// other selectors
var gameBoard = document.querySelector('#game-board');
var gameCards = document.querySelectorAll('.game-card');
var startErrorMessage = document.querySelector('.start-error-message');
var startPlayer1Input = document.querySelector('#start-player1-input');
var startPlayer2Input = document.querySelector('#start-player2-input');
var player1TurnLabel = document.querySelector('#player1-turn');
var player2TurnLabel = document.querySelector('#player2-turn');

// global non-qs variables
var winners = getWinnersFromStorage() || [];
var decksArr = null;
var picSrc = ['images/card-pic5.jpg', 'images/card-pic1.jpg', 'images/card-pic2.jpg', 'images/card-pic1.jpg', 'images/card-pic3.jpg', 'images/card-pic2.jpg', 'images/card-pic4.jpg', 'images/card-pic5.jpg', 'images/card-pic3.jpg', 'images/card-pic4.jpg'];
var playersArr = [];
var timeEnd = null;
var timeStart = null;
var totalTime = null;
var player1Name = null;
var player2Name = null;

// event listeners
gameBoard.addEventListener('click', clickGameBoard);
newGameButton.addEventListener('click', clickNewGameButton);
rulesPlayButton.addEventListener('click', clickRulesPlayButton);
startPlayButton.addEventListener('click', clickStartPlayButton);
topPlayerButton.addEventListener('click', showTopPlayers);
window.addEventListener('load', pageLoad);
rematchButton.addEventListener('click', clickRematchButton);

// mega functions
function clickRematchButton() {
  instantiateCards();
  startTimer();
  decksArr.resetCards();
  decksArr.shuffle(picSrc);
  showCards();
  resetPlayers();
  popupPlayerText.innerText = player1Name;
  switchSections(gameOverScreen, gameScreen);
};

function pageLoad() {
  updateTopPlayerBoard();
};

function clickGameBoard() {
  if (event.target.classList.contains('popup-start-button')) {
    console.log(event);
    hidePopup();
  }
  if (event.target.parentNode.classList.contains('game-card') && decksArr.selectedCards.length < 2 && event.target.parentElement.parentElement.parentElement.children[0].classList.contains('hide')) {
    flipCardPic(event);
  }
};

function clickNewGameButton() {
  decksArr.resetCards();
  decksArr.shuffle(picSrc);
  switchSections(gameOverScreen, startScreen);
  clearInputs();
  showCards();
  resetPlayers();
};

function clickRulesPlayButton() {
  switchSections(rulesScreen, gameScreen);
  instantiateCards();
  startTimer();
};

function clickStartPlayButton() {
  if (startPlayer1Input.value.length && startPlayer2Input.value.length) {
    sendToStorage('player1Name', startPlayer1Input.value);
    sendToStorage('player2Name', startPlayer2Input.value);
    player1Name = getFromStorage('player1Name').toUpperCase();
    player2Name = getFromStorage('player2Name').toUpperCase();
    insertNames(player1Text, player1Name);
    insertNames(player2Text, player2Name);
    switchSections(startScreen, rulesScreen);
    popupPlayerText.innerText = player1Name;
  } else {
    showErrorMessage(startErrorMessage);
  }
};

//functions
function getWinnersFromStorage() {
  if ('winnersArr' in localStorage) {
   return JSON.parse(localStorage.getItem('winnersArr'));
  }
};

function showPopup() {
  event.target.parentElement.parentElement.parentElement.children[0].classList.remove('hide');
  decksArr.resetCards();
  decksArr.shuffle(picSrc);
  instantiateCards();
  showCards();
};

function hidePopup(playerName) {
  event.target.parentNode.classList.add('hide');
  var player = new Player({name: event.target.parentElement.children[0].children[0].innerText, startTime: Date.now()})
  playersArr.push(player);
};

function showTopPlayers() {
  topPlayerBoard.classList.toggle('hide');
};

function sendToStorage(key, value) {
  localStorage.setItem(key, value);
};

function getFromStorage(key) {
  return localStorage.getItem(key);
};

function calculateTime(start, i) {
  timeEnd = Date.now();
  playersArr[i].totalTime = (timeEnd - start)/1000;
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
  event.target.parentNode.classList.add('on-click-animation');
  event.target.parentNode.classList.remove('no-match-animation');
  event.target.src = decksArr.cards[event.target.parentNode.dataset.id].matchId;
  event.target.parentNode.classList.add('flipped');
  callMethods(event);
};

function flipCardBack(event) {
  for (var i = 0; i < gameCards.length; i++) {
    if (gameCards[i].classList.contains('flipped')) {
      gameCards[i].classList.remove('flipped');
      gameCards[i].classList.add('no-match-animation');
      gameCards[i].children[0].src = 'images/letter-p.png';
      decksArr.cards[i].updateSelected(decksArr);
      gameCards[i].classList.remove('on-click-animation');
    }
  }
};

function hideCard(event) {
  for (var i = 0; i < gameCards.length; i++) {
    if (gameCards[i].classList.contains('flipped')) {
      gameCards[i].classList.remove('flipped');
      gameCards[i].classList.add('hide-card');
      gameCards[i].classList.remove('on-click-animation');
    }
  }
}

function hideMatched(event) {
  var isMatch = decksArr.checkMatched();
  if (isMatch) {
    setTimeout(function() {
      hideCard(event)
    }, 1000);
    if (playersArr[0].matchCount < 5) {
      playersArr[0].matchCount++;
    }
    if (playersArr[1]) {
      playersArr[1].matchCount++;
      gameAsidePlayer2MatchesNumber.innerText = playersArr[1].matchCount;
    }
    gameAsidePlayer1MatchesNumber.innerText = playersArr[0].matchCount;
  } else {
    setTimeout(function() {
      flipCardBack(event)
    }, 2500);
  }
  if (playersArr[0].matchCount === 5 && decksArr.matches === 5) {
    calculateTime(playersArr[0].startTime, 0);
    updateWinners(player1Name, 0);
    popupPlayerText.innerText = player2Name;
    showPopup();
    switchSections(player1TurnLabel, player2TurnLabel);
  }
  if (playersArr[1] && playersArr[1].matchCount === 5) {
    calculateTime(playersArr[1].startTime, 1);
    switchSections(gameScreen, gameOverScreen);
    updateWinners(player2Name, 1);
    logTime();
    switchSections(player2TurnLabel, player1TurnLabel);
  }
};

function resetPlayers() {
  playersArr = [];

};

function insertNames(text, input) {
  for (var i = 0; i < text.length; i++) {
    text[i].innerText = input;
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
  totalMinutes0 = Math.floor(playersArr[0].totalTime/60);
  totalSeconds0 = Math.round(playersArr[0].totalTime%60);
  player1Minutes.innerText = totalMinutes0;
  player1Seconds.innerText = totalSeconds0;
  totalMinutes1 = Math.floor(playersArr[1].totalTime/60);
  totalSeconds1 = Math.round(playersArr[1].totalTime%60);
  player2Minutes.innerText = totalMinutes1;
  player2Seconds.innerText = totalSeconds1;
  if (playersArr[0].totalTime < playersArr[1].totalTime) {
    winnerText.innerText = playersArr[0].name;
  } else {
    winnerText.innerText = playersArr[1].name;
  }
};

function showCards() {
  for (var i = 0; i < gameCards.length; i++) {
    gameCards[i].classList.remove('hide-card');
    gameCards[i].classList.remove('flipped');
    gameCards[i].classList.remove('no-match-animation');
    gameCards[i].children[0].src = 'images/letter-p.png';
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


function updateWinners(playerName, i) {
  winners.push({name: playerName, time: playersArr[i].totalTime});
  sortWinners();
  var stringifiedWinnersArr = JSON.stringify(winners);
  localStorage.setItem('winnersArr', stringifiedWinnersArr);
  updateTopPlayerBoard();
};

function sortWinners(){
  winners.sort(function(a, b) {
    return a.time - b.time;
  })
};

function updateTopPlayerBoard() {
  var parsedWinnersArr = JSON.parse(localStorage.getItem('winnersArr'));
  if (winners.length < 5) {
    for (var i = 0; i < parsedWinnersArr.length; i++) {
      topPlayerNames[i].innerText = parsedWinnersArr[i].name;
      topPlayerTimes[i].innerText = Math.round(parsedWinnersArr[i].time) + " seconds";
    }
  }
  if (winners.length >= 5) {
    for (var i = 0; i < 5; i++) {
      topPlayerNames[i].innerText = parsedWinnersArr[i].name;
      topPlayerTimes[i].innerText = Math.round(parsedWinnersArr[i].time) + " seconds";
    }
  }
};
