const readline = require("readline-sync");

const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const SQUARE_ROWS = 3;      //Square rows must be odd;
const SQUARE_COLS = 5;      //Square cols must be odd;
const MAX_SQUARES = BOARD_ROWS * BOARD_COLS;
const SPACE_FILLER = Array(SQUARE_COLS).fill(' ').join('');
const SEPARATOR = Array(SQUARE_COLS).fill('-').join('');

function prompt(msg) {
  console.log(`==> ${msg}`);
}

function displayPositions(board, row) {
  let padWidth = (SQUARE_COLS - 1) / 2;
  let padding = Array(padWidth).fill(' ').join('');
  let sliceStart = row * BOARD_COLS;
  let sliceEnd = sliceStart + BOARD_COLS;
  let positionsRow = board.slice(sliceStart, sliceEnd)
                          .map( position => padding + position + padding)
                          .join('|');
  
  console.log(positionsRow);
}

function displaySquares(board, row) {
  for (let sqRow = 0; sqRow < SQUARE_ROWS; sqRow += 1) {
    if (sqRow === (SQUARE_ROWS - 1) / 2) {
      displayPositions(board, row);
      continue;
    }
    console.log(Array(BOARD_COLS).fill(SPACE_FILLER).join('|'));
  }
}

function displayBoard(board) {
  console.clear();
  for (let brdRow = 0; brdRow < BOARD_ROWS; brdRow += 1) {
    displaySquares(board, brdRow);
    if (brdRow !== BOARD_ROWS - 1) {
      console.log(Array(BOARD_COLS).fill(SEPARATOR).join('+'));
    }
  }
}

function initializeBoard() {
  let emptyBoard = [];
  for (let ctr = 0; ctr < MAX_SQUARES; ctr += 1) {
    emptyBoard[ctr] = ' ';
  }
  return emptyBoard;
}

function unfilledSquares(board) {
  return [...board.keys()].filter( index => board[index] === ' ');
}

function playerChoosesSquare(board) {
  let emptySquares = unfilledSquares(board); 
  let emptySquaresMsg = emptySquares.map( index => index + 1).join(', ');
  prompt(`Choose a square: ${emptySquaresMsg})`);
  let square = Number(readline.question().trim()) - 1;
  while (!emptySquares.includes(square)) {
    prompt(`Invalid input. Choose an empty square: ${emptySquaresMsg}`);
    square = Number(readline.question().trim()) - 1;
  }
  board[square] = PLAYER_MARKER;

  return board;
}

function computerChoosesSquare(board) {
  let emptySquares = unfilledSquares(board);
  if (!emptySquares.length) return board;
  
  let index = Math.floor(Math.random() * emptySquares.length);
  board[emptySquares[index]] = COMPUTER_MARKER;
  return board;
}

function someoneWon(board) {
  return false;
}

let board = initializeBoard();
displayBoard(board);
while (unfilledSquares(board).length !== 0) {
  board = playerChoosesSquare(board);
  board = computerChoosesSquare(board);
  displayBoard(board);

  if (someoneWon(board)) break;
}

