// DOM Elements

var sixty = document.getElementById("sixty");
var ninety = document.getElementById("ninety");
var hundredtwenty = document.getElementById("hundredtwenty");

var timeButtons = [sixty, ninety, hundredtwenty];

for (let i = 0; i < timeButtons.length; i++) {
  timeButtons[i].addEventListener("click", timeHandler);
}



// Event Listeners

function timeHandler(event) {
  var chosenTime = parseInt(event.target.innerText);
  var queryString = `?time=${chosenTime}`;

  window.location.href = `game.html${queryString}`;
}