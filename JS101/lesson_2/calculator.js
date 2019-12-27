const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num)) ;
}

function invalidOperation(operation) {
  return !['1', '2', '3', '4'].includes(operation); 
}
	
prompt("Welcome to the calculator");
prompt("Enter the first number");

let num1 = readline.question();
while(invalidNumber(num1)) {
  prompt("Invalid number. Enter a valid number.");
  num1 = readline.question();
}

prompt("Enter the second number");
let num2 = readline.question();
while(invalidNumber(num2)) {
  prompt("Invalid number. Enter a valid number.");
  num2 = readline.question();
}

prompt("What operation do you want to perform? \n \t1)Add 2)Subract 3)Multiply 4) Divide");
let operation = readline.question();
while(invalidOperation(operation)) {
  prompt("Invalid operation. Enter a valid number from 1 to 4.");
  operation = readline.question();
}


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

prompt("The result is " + output);
