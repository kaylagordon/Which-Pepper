// sections
var startScreen = document.querySelector('.start-screen');
var rulesScreen = document.querySelector('.rules-screen');

// buttons
var startPlayButton = document.querySelector('#start-play-button');

// event listeners
startPlayButton.addEventListener('click', switchSections);

// functions
function switchSections() {
  startScreen.classList.add('hide');
  rulesScreen.classList.remove('hide');
};
