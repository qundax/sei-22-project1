// DOM Elements

var score = document.getElementById("score");

var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var fourth = document.getElementById("fourth");

var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
var times = document.getElementById("times");
var divide = document.getElementById("divide");

var cards = [first, second, third, fourth];
var operators = [plus, minus, times, divide];

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", clickHandler);
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", clickHandler);
}

var newGame = document.getElementById("new-game");
var undo = document.getElementById("undo");
var skipButton = document.getElementById("skip");
var noSolution = document.getElementById("no-solution")

newGame.addEventListener("click", startNewGame);
undo.addEventListener("click", undoGame);



// Base Objects

var opers = ["+", "-", "*", "/"];
opersArray = permRep(opers);

var tempState = genNumArray();

var data = {
  currentSelection: null,
  previousSelection: null,
  total: 0,
  originalState: tempState.slice(0),
  cardState: tempState.slice(0)
}

populateState();



// Functions
// Helper Functions

function perm(array) {
  let output = [];

  for (let i = 0; i < array.length; i++) {
    let remainder = perm(array.slice(0, i).concat(array.slice(i + 1)));

    if(!remainder.length) {
      output.push([array[i]])
    } else {
      for(let j = 0; j < remainder.length; j++) {
        output.push([array[i]].concat(remainder[j]))
      }
    }
  }

  return output;
}

function permRep(array) {
  var output = [];
  var temp = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let x = 0; x < array.length; x++) {
        temp = [array[i], array[j], array[x]];
        output.push(temp);
      }
    }
  }

  return output;
}

function genNumArray() {
  output = [];

  for (let i = 0; i < 4; i++) {
    output.push(Math.ceil(Math.random() * 9));
  }

  return output;
}

function parentDouble(permutations) {
  for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < opersArray.length; j++) {
      var temp = `(${permutations[i][0]}${opersArray[j][0]}${permutations[i][1]})${opersArray[j][1]}(${permutations[i][2]}${opersArray[j][2]}${permutations[i][3]})`;
      if (eval(temp) === 24) {
        console.log(temp);
        return true;
      }
    }
  }

  return false
}

function parentMid(permutations) {
  for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < opersArray.length; j++) {
      var temp = `${permutations[i][0]}${opersArray[j][0]}(${permutations[i][1]}${opersArray[j][1]}${permutations[i][2]})${opersArray[j][2]}${permutations[i][3]}`;
      if (eval(temp) === 24) {
        console.log(temp);
        return true;
      }
    }
  }

  return false
}

function parentLeft(permutations) {
  for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < opersArray.length; j++) {
      var temp = `(${permutations[i][0]}${opersArray[j][0]}${permutations[i][1]}${opersArray[j][1]}${permutations[i][2]})${opersArray[j][2]}(${permutations[i][3]})`;
      if (eval(temp) === 24) {
        console.log(temp);
        return true;
      }
    }
  }

  return false
}

function parentRight(permutations) {
  for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < opersArray.length; j++) {
      var temp = `${permutations[i][0]}${opersArray[j][0]}(${permutations[i][1]}${opersArray[j][1]}${permutations[i][2]}${opersArray[j][2]}${permutations[i][3]})`;
      if (eval(temp) === 24) {
        console.log(temp);
        return true;
      }
    }
  }

  return false
}

function populateState() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerText = data.originalState[i];
  }
}

function endState(gameState) {
  var counter = 0;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === 0) {
      counter++;
    }
  }

  return counter === 3;
}

function checkWin() {
  if (endState(data.cardState)) {
    var total = 0;
    for (let i = 0; i < data.cardState.length; i++) {
      total += data.cardState[i];
    }

    if (total === 24) {
      setTimeout(function() {
        raiseScore();
        alert("You won!");
        startNewGame();
      }, 1500)
    } else {
      alert("You lost!");
    }
  }
}

function newState() {
  tempState = genNumArray();
  data.originalState = tempState.slice(0);
  data.cardState = tempState.slice(0);
}

function resetCards() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.visibility = "visible";
    cards[i].classList.remove("selected");
  }
}

function resetOperators() {
  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove("selected");
  }
}

function raiseScore() {
  var total = parseInt(score.innerText);
  total++;
  score.innerText = total;
}

function dropScore() {
  var total = parseInt(score.innerText);
  total--;
  score.innerText = total;
}



// Event Listeners

function clickHandler(event) {
  var currentTarget = event.target;
  if (currentTarget.classList.contains("selected")) {
    // Current target is selected
    data.currentSelection = null;
    currentTarget.classList.toggle("selected");
  } else {
    // Current target is not selected
    if (data.previousSelection === null) {
      // There is no previous selection
      if (data.currentSelection === null) {
        // There is no current selection
        if (currentTarget.classList[0] === "operator") {
          // An operator is selected before selecting a number
          alert("Please select a number first");
          // currentTarget.classList.toggle("selected");
        } else {
          // A number is the first element to be selected
          data.currentSelection = currentTarget;
          currentTarget.classList.toggle("selected");
        }
      } else {
        // There is a current selection
        if (data.currentSelection.classList[0] === currentTarget.classList[0]) {
          // Current target is the same class as the previously selected target
          if (currentTarget.classList[0] === "card") {
            // Another number is selected after selecting a number
            alert("Choose an operator");
          } else {
            // Another operator is selected after selecting an operator
            alert("Choose another number");
          }
        } else {
          // Current target is not the same as the previously selected target
          data.previousSelection = data.currentSelection;
          data.currentSelection = currentTarget;
          currentTarget.classList.toggle("selected");
        }
      }
    } else {
      // There is a previous selection
      if (data.currentSelection === null) {
        // There is no current selection
        if (currentTarget.classList[0] === "card") {
          alert("Please choose an operator");
        }
      } else {
        // There is a current selection
        if (currentTarget.classList[0] === "operator") {
          alert("Please choose another number");
        } else {
          data.total = eval(`${data.previousSelection.innerText} ${opers[operators.indexOf(data.currentSelection)]} ${currentTarget.innerText}`);
          data.previousSelection.style.visibility = "hidden";
          currentTarget.innerText = data.total;
          data.currentSelection.classList.toggle("selected");

          data.cardState[cards.indexOf(data.previousSelection)] = 0;
          data.cardState[cards.indexOf(currentTarget)] = data.total;

          data.previousSelection = null;
          data.currentSelection = null;

          checkWin();
        }
      }
    }
  }
}

function startNewGame(event) {
  data.currentSelection = null;
  data.previousSelection = null;
  data.total = 0;
  resetCards();
  resetOperators();
  newState();
  populateState();
}

function undoGame(event) {
  data.currentSelection = null;
  data.previousSelection = null;
  data.total = 0;
  resetCards();
  resetOperators();
  populateState();
}



// Main functions

function makes24(array) {
  var perms = perm(array);
  return parentLeft(perms) || parentMid(perms) || parentRight(perms) || parentDouble(perms);
}