// Base Objects

var opers = ["+", "-", "*", "/"];
opersArray = permRep(opers);



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

function basic24(permutations) {
  for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < opersArray.length; j++) {
      var temp = `${permutations[i][0]}${opersArray[j][0]}${permutations[i][1]}${opersArray[j][1]}${permutations[i][2]}${opersArray[j][2]}${permutations[i][3]}`;
      if (eval(temp) === 24) {
        console.log(temp);
        return true;
      }
    }
  }

  return false
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



// Main functions

function makes24(array) {
  var perms = perm(array);
  return basic24(perms) || parentLeft(perms) || parentMid(perms) || parentRight(perms) || parentDouble(perms);
}