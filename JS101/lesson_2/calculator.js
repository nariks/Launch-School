const readline = require("readline-sync");

console.log("Welcome to the calculator");
console.log("Enter the first number");
let num1 = Number(readline.question());
console.log("Enter the second number");
let num2 = Number(readline.question());
console.log("What operatoin do you want to perform \n 1)Add 2)Subract 3)Multiply 4) Divide ?");
let operation = readline.question();

let output;

switch (operation) {
   case '1': 
    output = num1 + num2;
    break;
  case '2':
    output = num1 - num2;
    break; 
  case '3': 
    output = num1 * num2;
    break;
  case '4':
    output = num1 / num2;
    break;
}

console.log("The result is " + output);
