//create an object that expresses the freq with with each letter occurs in a
//string

let statement = "The Flintsones Rock";
let charFrequency = {};

for (let ctr = 0; ctr < statement.length; ctr += 1) {
  let freq = 0;
  if (statement[ctr] === " ") continue;
  for (let innerCtr = 0; innerCtr < statement.length; innerCtr += 1) {
    
    if (statement[innerCtr] === statement[ctr]) {
      freq += 1;
    }
  }
  charFrequency[statement[ctr]] = freq;
}

console.log(charFrequency);

