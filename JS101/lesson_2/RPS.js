const readline = require('readline-sync');

/* eslint-disable id-length */
const SHAPES = {
  r:    { name: 'rock',     beats: ['s', 'l'] },
  p:    { name: 'paper',    beats: ['r', 'sp'] },
  s:    { name: 'scissors', beats: ['p', 'l'] },
  l:    { name: 'lizard',   beats: ['p', 'sp'] },
  sp:   { name: 'Spock',    beats: ['r', 's'] }
};
/* eslint-disable id-length */

const VALID_CHOICES = Object.keys(SHAPES);
const PLAY_AGAIN_CHOICES = ['y', 'yes', 'n', 'no'];
const cyan = '\x1b[36m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const blink = '\x1b[5m';

function prompt(message, color = cyan) {
  console.log(`${color}=> ${message}\x1b[0m`);
}

function getPlayerChoice() {
  let playerChoice = readline.question().toLowerCase();
  while (!VALID_CHOICES.includes(playerChoice)) {
    prompt(`Invalid choice. Choose one from ${VALID_CHOICES.join(', ')}`);
    playerChoice = readline.question().toLowerCase();
  }
  return playerChoice;
}

function computerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function displayChoices(game) {
  let playerChoice = SHAPES[game.player.choice].name;
  let computerChoice = SHAPES[game.computer.choice].name;
  prompt(`Player chooses ${playerChoice}, Computer chooses ${computerChoice}.`);
}

function roundResult(game) {
  let round = {winner: '', loser: ''};
  if (game.player.choice === game.computer.choice) return "Tie Game";
  if (SHAPES[game.player.choice]['beats'].includes(game.computer.choice)) {
    [round.winner, round.loser] = ['player', 'computer'];
    } else {
    [round.winner, round.loser] = ['computer', 'player'];
  }
  return round;
}

function roundScore(game, round) {
  if (round.winner === 'player') {
    game.player.score += 1;
  } else {
    game.computer.score += 1;
  }
}

function displayRoundResult(game, round) {
  if (round === 'Tie Game') {
    prompt('No Winner this round!' + round);
  } else {
    let winnerChoice  = SHAPES[game[round.winner].choice].name;
    let loserChoice = SHAPES[game[round.loser].choice].name;
    prompt(`${winnerChoice} beats ${loserChoice}.`);
    prompt(`${round.winner.toUpperCase()} wins this round`);
  }
}

function displayRoundScore(game) {
  prompt(`Player: ${game.player.score} Computer: ${game.computer.score}\n`,red);
}

function displayFinalScore(game) {
  prompt(`FINAL SCORE`, yellow);
  prompt(`Player: ${game.player.score}, Computer: ${game.computer.score}`,
          yellow);
  if (game.player.score > game.computer.score) {
    prompt(`PLAYER wins the game !!!\n`, blink);
  } else {
    prompt(`COMPUTER wins the game !!!\n`, blink);
  }
}

function anotherGame(userInput) {
  while (!PLAY_AGAIN_CHOICES.includes(userInput)) {
      prompt('Invalid input. Enter y or n to coninue');
      userInput = readline.question();
    }
  return userInput;
}

let playAgain;
while (true) {

  let game = { player:    {choice: '', score: 0},
               computer:  {choice: '', score: 0} };

  console.clear();
  prompt('Welcome to Rock Paper Scissor game !');
  prompt('************************************');

  while (game.player.score < 5 &&  game.computer.score < 5) {

    prompt('Player choose your weapon !!!');
    prompt('Enter r for rock, p for paper, s for scissors,' +
           'l for lizard, sp for Spock');

    game.player.choice = getPlayerChoice();
    game.computer.choice = computerChoice();
    displayChoices(game);

    let result = roundResult(game);
    if (result !== 'Tie Game') roundScore(game, result);
    displayRoundResult(game, result);
    displayRoundScore(game);
  }

  displayFinalScore(game);

  prompt('Do you want to play again? Enter y or n to continue');
  playAgain = anotherGame(readline.question());

  if (['n', 'no'].includes(playAgain.toLowerCase())) break;
}
