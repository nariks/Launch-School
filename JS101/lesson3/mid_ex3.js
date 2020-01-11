//returns factors of a positive number


function factors(number) {
  let divisor = number;
  let factors = [];

  for (let i = divisor; i > 0; i -= 1) {
    if (number % i === 0) {
      factors.push(number / i);
    }
  }
  return factors;
}

console.log(factors(10));
console.log(factors(33));
console.log(factors(-1));



