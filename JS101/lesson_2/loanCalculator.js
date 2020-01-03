const readline = require("readline-sync");

function prompt(message) {
  console.log(`==> ${message}`);
}

function isInvalidAmount(input) {
  return !!((input === '' || Number.isNaN(+input) || +input <= 0));
}

function isInvalidInterest(input) {
  return (input === '' || Number.isNaN(+input) || +input < 0 || +input > 100);
}

function isInvalidYear(year) {
  return (year === '' || Number.isNaN(+year) || !Number.isInteger(+year)
              || +year < 0 || +year > 100);
}

function isInvalidMonth(month) {
  return (month === '' || Number.isNaN(+month) || !Number.isInteger(+month) ||
                +month < 0 || +month > 12);
}

function isInvalidContinue(input) {
  if (input === '') return true;
  input = input.toLowerCase();
  return !(input === 'y' || input === 'yes' || input === 'n' || input === 'no');
}

function getAmount() {
  let input = readline.question();
  while (isInvalidAmount(input)) {
    prompt("Enter a number greater than 0.");
    input = readline.question();
  }
  return +input;
}

function getInterest() {
  let input = readline.question();
  while (isInvalidInterest(input)) {
    prompt("Enter a number from 0 upto 100.");
    input = readline.question();
  }
  return +input;
}

function validateYear(year) {
  while (isInvalidYear(year)) {
    prompt("Invalid year. Enter a whole number from 0 upto 100");
    year = readline.question();
  }
  return +year;
}

function validateMonth(month) {
  while (isInvalidMonth(month)) {
    prompt("Invalid month. Enter a whole number from 0 upto 12");
    month = readline.question();
  }
  return +month;
}

function getTermInMonths() {
  let [year, month] = readline.question().split(',');
  year = validateYear(year);
  month = validateMonth(month);
  return ((year * 12) + month);
}

function getContinue() {
  let input = readline.question();
  while (isInvalidContinue(input)) {
    prompt("Enter 'y' or 'n' to continue.");
    input = readline.question();
  }
  return input[0];
}

function numberFormat(number) {
  //Add number separators based on locale and round to 2 decimal places.
  return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}

function calculatePayment(loanAmount, monthlyInterest, loanTermInMonths) {
  //formula adjusted to account for 0% interest rate
  if (monthlyInterest === 0) return (loanAmount / loanTermInMonths);
  return  loanAmount * (monthlyInterest /
         (1 - Math.pow((1 + monthlyInterest),(-loanTermInMonths))));
}

let anotherCalc = true;

while (anotherCalc) {

  let loanAmount, yearlyInterest, monthlyInterest,
      loanTermInMonths, monthlyPayment, totalInterestPaid;

  console.clear();
  prompt("Monthly loan payment calculator");
  prompt("*******************************");

  prompt("Enter the loan amount");
  loanAmount = getAmount();

  prompt("Enter the interest Annual Percentage Rate (APR) as a %");
  yearlyInterest = getInterest() / 100;
  monthlyInterest = yearlyInterest / 12;

  prompt("Enter the loan duration in years & months");
  prompt("For example enter 3 year and 5 months as 3,5");
  loanTermInMonths = getTermInMonths();
  prompt("Total months in loan period = " + loanTermInMonths);

  monthlyPayment = calculatePayment(loanAmount, monthlyInterest,
                                    loanTermInMonths);
  totalInterestPaid = (monthlyPayment * loanTermInMonths) - loanAmount;
  prompt(`Monthly payment : $${numberFormat(monthlyPayment)}`);
  prompt("Total Interest paid at end of loan term :" +
            ` $${numberFormat(totalInterestPaid)}\n`);

  prompt("Do you want another calculation? Enter 'y' to continue, 'n' to exit");
  anotherCalc = getContinue().toLowerCase() === 'y';
}
