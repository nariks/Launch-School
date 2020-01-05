const readline = require('readline-sync');

const VALID_CHOICES = ['r', 'p', 's', 'l', 'sp'];
const PLAY_AGAIN_CHOICES = ['y', 'yes', 'n', 'no'];
/* eslint-disable id-length */
const GAME_DETAILS = {
  r:    { name: 'rock',     beats: ['s', 'l'] },
  p:    { name: 'paper',    beats: ['r', 'sp'] },
  s:    { name: 'scissors', beats: ['p', 'l'] },
  l:    { name: 'lizard',   beats: ['p', 'sp'] },
  sp:   { name: 'Spock',    beats: ['r', 's'] }
};
/* eslint-disable id-length */

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

function displayChoices(player, computer) {
  let playerChoice = GAME_DETAILS[player.choice].name;
  let computerChoice = GAME_DETAILS[computer.choice].name;
  prompt(`Player chooses ${playerChoice}, Computer chooses ${computerChoice}.`);
}

function roundResult(player, computer) {
  let round= {winner: '', winnerChoice: '', loser: '', loserChoice: ''};
  if (player.choice === computer.choice) return "Tie Game";
  if (GAME_DETAILS[player.choice]['beats'].includes(computer.choice)) {
    [round.winner, round.loser] = ['player', 'computer'];
    round.winnerChoice  = GAME_DETAILS[player.choice].name;
    round.loserChoice = GAME_DETAILS[computer.choice].name;
  } else {
    [round.winner, round.loser] = ['computer', 'player'];
    round.winnerChoice = GAME_DETAILS[computer.choice].name;
    round.loserChoice = GAME_DETAILS[player.choice].name;
  }
  return round;
}

function roundScore(result) {
  if (result.winner = 'player') {
    score.player += 1;
  } else {
    score.computer += 1;
  }
}

function displayWinner(round) {
  if (round === 'Tie Game') {
    prompt(round);
  } else {
    prompt(`${round.winnerChoice} beats ${round.loserChoice}.`);
    prompt(`${round.winner.toUpperCase()} wins`);
  }
}

let playAgain ;
let score = { player: 0, computer: 0 };
console.log(score.player, score.computer);

while (score.player < 5 &&  score.computer < 5) {
  //let choice = {player: '', computer: ''};
  let player = {choice: ''};
  let computer = {choice: ''};
  console.log(score.player, score.computer);

  console.clear();
  prompt(score.player, score.computer);
  prompt('Welcome to Rock Paper Scissor game !');
  prompt('************************************');
  prompt('Player turn. Choose your weapon !!!'); 
  prompt("Enter r for rock, p for paper, s for scissors,\
          l for lizard, sp for Spock");
  player.choice = getPlayerChoice();
  console.log(player.choice);
  computer.choice = computerChoice();
  displayChoices(player, computer);
  
  result = roundResult(player, computer);
  if (result != 'Tie Game') roundScore(result);

  displayWinner(result);

  /*prompt('Do you want to play again? Enter y or n to continue');
  playAgain = readline.question();
  while (!PLAY_AGAIN_CHOICES.includes(playAgain)) {
    prompt('Invalid input. Enter y or n to coninue');
    playAgain = readline.question();
  }*/
  //if (['n', 'no'].includes(playAgain.toLowerCase())) break;
}

if (score.player > score.computer) {
  prompt(`Player - ${score.player} Computer - ${score.computer} Player Wins`);
} else {
  prompt(`Player - ${score.player} Computer - ${score.computer} Computer Wins`);
}
