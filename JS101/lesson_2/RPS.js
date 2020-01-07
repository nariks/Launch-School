const readline = require('readline-sync');
//const
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

function prompt(message) {
  console.log('=> ' + message);
}

function getPlayerChoice() {
  let playerChoice = readline.question();
  while (!VALID_CHOICES.includes(playerChoice)) {
    prompt(`Invalid choice. Choose one from ${VALID_CHOICES.join(', ')}`);
    playerChoice = readline.question();
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
  prompt(`Player - ${game.player.score} Computer - ${game.computer.score}\n`);
}

let playAgain ;
while (true) {
let game = { player:    {choice: '', score: 0}, 
             computer:  {choice: '', score: 0}
}

console.clear();
prompt('Welcome to Rock Paper Scissor game !');
prompt('************************************');
while (game.player.score < 5 &&  game.computer.score < 5) {

  prompt('Player choose your weapon !!!'); 
  prompt("Enter r for rock, p for paper, s for scissors, l for lizard, sp for Spock");
  game.player.choice = getPlayerChoice();
  game.computer.choice = computerChoice();
  displayChoices(game);
  
  result = roundResult(game);
  if (result != 'Tie Game') roundScore(game, result);
  displayRoundResult(game, result);
  displayRoundScore(game);

}

if (game.player.score > game.computer.score) {
  prompt(`Player - ${game.player.score} Computer - ${game.computer.score} Player Wins`);
} else {
  prompt(`Player - ${game.player.score} Computer - ${game.computer.score} Computer Wins`);
}

prompt('Do you want to play again? Enter y or n to continue');
  playAgain = readline.question();
  while (!PLAY_AGAIN_CHOICES.includes(playAgain)) {
    prompt('Invalid input. Enter y or n to coninue');
    playAgain = readline.question();
  }
if (['n', 'no'].includes(playAgain.toLowerCase())) break;
}
