// sections
var startScreen = document.querySelector('.start-screen');
var rulesScreen = document.querySelector('.rules-screen');

// buttons
var startPlayButton = document.querySelector('#start-play-button');

// inputs
var startPlayer1Input = document.querySelector('#start-player1-input');
var startPlayer2Input = document.querySelector('#start-player2-input');

// text changes
var rulesPlayer1Name = document.querySelector('#rules-player1-name');
var rulesPlayer2Name = document.querySelector('#rules-player2-name');


// event listeners
startPlayButton.addEventListener('click', clickStartPlayButton);

// mega functions
function clickStartPlayButton() {
  switchSections(startScreen, rulesScreen);
  insertNames(rulesPlayer1Name, startPlayer1Input);
  insertNames(rulesPlayer2Name, startPlayer2Input);
};

//functions
function switchSections(hide, show) {
  hide.classList.add('hide');
  show.classList.remove('hide');
};

function insertNames(text, input) {
  var capitalName = input.value.toUpperCase();
  text.innerHTML = capitalName;
};
