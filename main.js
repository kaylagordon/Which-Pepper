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

// event listeners
startPlayButton.addEventListener('click', clickStartPlayButton);
rulesPlayButton.addEventListener('click', clickRulesPlayButton);

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
  switchSections(rulesScreen, gameScreen)
}

//functions
function switchSections(hide, show) {
  hide.classList.add('hide');
  show.classList.remove('hide');
};

function insertNames(text, input) {
  var capitalName = input.value.toUpperCase();
  text.innerHTML = capitalName;
};

function showErrorMessage(errorText) {
  errorText.classList.remove('hide');
}
