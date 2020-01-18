let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let flintstonesObj = {};

flintstones.forEach( (character, idx) => {
  flintstonesObj[character] = idx;
});

console.log(flintstonesObj);



