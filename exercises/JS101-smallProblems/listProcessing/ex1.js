//write a function that takes one argument, positive integer and returns the sum
//of its digits.

function sumOfDigits(number) {
  
  if (number < 0) return;
  let digits = String(number).split('');
  let sum = 0;
  
  digits.forEach (digit => {
    sum += +digit;
  });
  
  return sum;
}

console.log(sumOfDigits(23));
console.log(sumOfDigits(45));
console.log(sumOfDigits(123456789));
