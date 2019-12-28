const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

function invalidOperation(operation) {
  return !['1', '2', '3', '4'].includes(operation);
}

function getUserInput(inputType) {
  let input = readline.question();
  if (inputType === 'number') {
    return invalidNumber(input) ? getValidNumber() : Number(input);
  } else if (inputType === 'operation') {
    return invalidOperation(input) ? getValidOperation(input) : input
  }
}

function getValidNumber() {
  let number;
  do {
    prompt("Invalid number. Enter a valid number.");
    number = readline.question();
  } while (invalidNumber(number)) 
  return Number(number);
}

function getValidOperation() {
  let operation
  do {
    prompt("Invalid operation. Enter a valid number from 1 to 4.");
    operation = readline.question();
  } while (invalidOperation(operation))
  return operation;
}

let tryAgain = true;

while (tryAgain) {

  prompt("Welcome to the calculator");
  prompt("_________________________");
  prompt("Enter the first number");
  let num1 = getUserInput('number');

  prompt("Enter the second number");
  let num2 = getUserInput('number');

  prompt("What operation do you want to perform? \n \t1)Add 2)Subract 3)Multiply 4) Divide");
  let operation = getUserInput('operation');

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
  prompt("*************************");
  prompt("Do you want to try again? Press Y to continue, any other key to exit");
  let userChoice = readline.question();
  tryAgain = userChoice.toLowerCase() === 'y' ;
}
