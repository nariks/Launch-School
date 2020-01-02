const readline = require("readline-sync");

function prompt(message) {
  console.log(`==> ${message}`);
}

function isInvalidAmount(input) {
  return (input === '' || Number.isNaN(+input) || +input <= 0) ? true : false;
}

function isInvalidInterest(input) {
  return (input === '' || Number.isNaN(+input) || +input <=0 || +input >= 100);
}

function isInvalidTerm(input) {
  return (input === '' || Number.isNaN(+input) || +input <=0 || +input >= 100);
}

function isInvalidContinue(input) {
  return !(input[0] === 'y' || input[0] === 'n');
}

function getValidAmount() {
  let input;
  do {
    prompt("Enter a valid load amount. Only numbers greater than 0 are accepted.");
    input = readline.question();
  } while (isInvalidAmount(input));
  return +input;
}

function getValidInterest() {
  let input;
  do {
    prompt("Enter a valid interest rate. Only rates from 0% to 100% are accepted.");
    input = readline.question();
  } while (isInvalidInterest(input));
  return +input;
}

function getValidTerm() {
  let input;
  do {
    prompt("Enter a valid duration between 0 to 50 years");
    input = readline.question();
  } while(isInvalidTerm(input));
  return +input;
}

function getValidContinue() {
  let input;
  do {
    prompt("Enter 'y' or 'n' only.")
    input = readline.question();
  } while (isInvalidContinue(input));
  return input;
}

function getUserInput(inputType) {
  let input = readline.question();
  switch (inputType) {
    case 'amount':   return (isInvalidAmount(input) ? getValidAmount() : input);
    case 'interest': return (isInvalidInterest(input) ? getValidInterest() : input);
    case 'term':     return (isInvalidTerm(input) ? getValidTerm() : input);
    case 'continue': return (isInvalidContinue(input) ? getValidContinue() : input);
    default:    
                prompt("Program error - getUserInput()");
                return undefined;
  }
}

let anotherCalc = true;
while (anotherCalc) {

  prompt("Monthly loan payment calculator");
  prompt("*******************************");  
  prompt("Enter the loan amount");
  let loanAmount = getUserInput('amount');
  prompt("Enter the interest Annual Percentage Rate (APR) as a %");
  let yearlyInterest = getUserInput('interest') / 100;
  let monthlyInterest = yearlyInterest / 12;
  prompt("Enter the loan duration in years");
  let loanTermInYears = getUserInput('term');
  let loanTermInMonths = loanTermInYears * 12;

  let monthlyPayment = loanAmount * 
                     (monthlyInterest /
                     (1 - Math.pow((1 + monthlyInterest),(-loanTermInMonths))));
  console.log(`Monthly payment : $${monthlyPayment.toLocaleString(undefined, 
                                    {maximumFractionDigits: 2})}`);
  
  prompt("Do you want another calculation? Enter 'y' to continue, 'n' to exit");
  anotherCalc = getUserInput('continue') === 'y' ? true : false;
}
