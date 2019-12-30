const readline = require("readline-sync");
const config = require("./messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num === '' || Number.isNaN(Number(num));
}

function invalidOperation(operation) {
  return !['1', '2', '3', '4'].includes(operation);
}

function getUserInput(inputType) {
  let userInput = readline.question();
  if (inputType === 'number') {
   userInput =  invalidNumber(userInput) ? getValidNumber() : Number(userInput);
  } else if (inputType === 'operation' && invalidOperation(userInput)) {
    userInput = getValidOperation(userInput);
  }
  return userInput;
}

function getValidNumber() {
  let number;
  do {
    prompt(config.displayText[language].invalidNum);
    number = readline.question();
  } while (invalidNumber(number));
  return Number(number);
}

function getValidOperation() {
  let operation;
  do {
    prompt(config.displayText[language].invalidOp);
    operation = readline.question();
  } while (invalidOperation(operation));
  return operation;
}

function calculate(num1, num2, operation) {
  switch (operation) {
    case '1': return num1 + num2;
    case '2': return num1 - num2;
    case '3': return num1 * num2;
    case '4': return num1 / num2;
    default : return "Unexpected Error...";
  }
}

function setLanguage(languageChoice) {
  let language = "English";
  if (["1", "2", "3"].includes(languageChoice)) {
    language = config.language.choices[Number(languageChoice) - 1];
  } else {
    prompt(config.language.invalidLanguage);
  }
  return language;
}


let tryAgain = true;
prompt(config.language.chooseLanguage);
let language = setLanguage(readline.question());

while (tryAgain) {

  prompt(config.displayText[language].welcome);
  prompt(config.displayText[language].separator);
  prompt(config.displayText[language].number1);
  let num1 = getUserInput('number');
  prompt(config.displayText[language].number2);
  let num2 = getUserInput('number');

  prompt(config.displayText[language].operation);
  let operation = getUserInput('operation');
  let output = calculate(num1, num2, operation);

  prompt(config.displayText[language].result + output);
  prompt(config.displayText[language].separator);
  prompt(config.displayText[language].tryAgain);
  let userChoice = readline.question();
  tryAgain = (userChoice.toLowerCase() === 'y');
}
