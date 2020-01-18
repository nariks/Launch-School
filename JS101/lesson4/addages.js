// add up all the ages in the Munster family object

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
}

let sumOfAges = 0;
for(let name in ages) {
  sumOfAges += ages[name];
}

console.log(sumOfAges);

let agetot2= Object.values(ages).reduce( (accumulator,age) => accumulator + age); 
console.log(agetot2);

function minAge() {
  let smallestAge = Infinity;
  for(let name in ages) {
    if (ages[name] < smallestAge) {
      smallestAge = ages[name];
    }
  }
  return smallestAge;
}

console.log(minAge());
