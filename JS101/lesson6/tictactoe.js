const readline = require("readline-sync");

const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const BOARD_ROWS = 2;          // Min value of 2
const BOARD_COLS = 2;          // Min value of 2
const SQUARE_ROWS = 3;         //Square rows must be odd;
const SQUARE_COLS = 5;         //Square cols must be odd;
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

function chooseSquare(board, turn) {
  if (turn === "Player") {
    board = playerChoosesSquare(board);
  } else if (turn === "Computer") {
    board = computerChoosesSquare(board);
  }
  return board;
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

function nextTurn(turn) {
  return (turn === "Player") ? "Computer" : "Player";
}

function marker(turn) {
  return (turn === "Player") ? PLAYER_MARKER : COMPUTER_MARKER;
}

function createNodes(tree, layer, turn) {
  let nodeId = tree.depth[layer].slice(-1)[0] + 1;
  tree.depth[layer + 1] = [];

  if (unfilledSquares(tree[tree.depth[layer][0]].board).length === 0) return tree;
    
  tree.depth[layer].forEach( node => {
    let parentBoard = tree[node].board.slice();
    let emptySquares = unfilledSquares(parentBoard);
    
    emptySquares.forEach( sq => {
      tree[node].children.push(nodeId);
      tree[nodeId] = {};
      tree[nodeId].board = parentBoard.slice();
      tree[nodeId].board[sq] = marker(turn);
      if (detectWinner(tree[nodeId].board))
      tree[nodeId].score = undefined;
      tree[nodeId].children = [];
      tree.depth[layer + 1].push(nodeId);
      nodeId += 1;
    
    });
  });
  turn = nextTurn(turn);
  return createNodes(tree, layer + 1, turn);
}

function constructTree(board, turn) {
  let tree = {depth: {}};
  let nodeId = 0;
  let layer = 0;
  tree[nodeId] = {}
  tree.depth[layer] = [nodeId];
  tree[nodeId].children = [];
  tree[nodeId].score = undefined;
  tree[nodeId].board = board.slice();
  return createNodes(tree, layer, turn);
}

/*function minimax(tree, turn) {
  if (turn === 'Player') {
    tree[0].child.forEach( childNode => {
      tree[childNode].score
    tree[0].score = max(children_node.scores
  } else {
    min(tree[0].children */

function computerChoosesSquare(board) {
  let choiceTree = constructTree(board, 'Computer');
//  let choice = calculateNodevalue
  console.log(choiceTree);
  let wait = readline.question("WAIT !!!");
  let emptySquares = unfilledSquares(board);
  if (!emptySquares.length) return board;

  let index = Math.floor(Math.random() * emptySquares.length);
  board[emptySquares[index]] = COMPUTER_MARKER;
  return board;
}

function detectWinner(lines) {
  let winner;
  lines.forEach( line => {
    if (line.every(sq => sq === PLAYER_MARKER)) {
      winner = 'Player';
    }
    if (line.every(sq => sq === COMPUTER_MARKER)) {
      winner = 'Computer';
    }
  });
  return winner;
}

function extractRows(board) {
  let rowLines = [];
  for (let index = 0; index < MAX_SQUARES; index += BOARD_COLS) {
    rowLines.push(board.slice(index, index + BOARD_COLS));
  }
  return rowLines;
}

function extractColumns(board) {
  let colLines = [];
  for (let ctr = 0; ctr < BOARD_COLS; ctr += 1) {
    colLines.push(board.filter( (_, index) => {
       return (index - ctr) % BOARD_COLS === 0;
}));
  }
  return colLines;
}

function extractDiags(board) {
  let diag1 = [];
  let diag2 = [];
  for (let ctr = 0; ctr < BOARD_COLS; ctr += 1) {
      diag1.push(board[(BOARD_COLS + 1) * ctr]);
  }

  for (let ctr = 1; ctr <= BOARD_COLS; ctr += 1) {
    diag2.push(board[(BOARD_COLS - 1) * ctr]);
  }
  return [diag1, diag2];
}

function someoneWon(board) {
  let rowLines = extractRows(board);
  let colLines = extractColumns(board);
  let diagLines = extractDiags(board);
  let boardLines = [...rowLines, ...colLines, ...diagLines];
  return detectWinner(boardLines);
}

let board = initializeBoard();
let turn = "Player";

displayBoard(board);
let winner;
let score = {Computer: 0, Player: 0};

while (unfilledSquares(board).length !== 0) {
  board = chooseSquare(board, turn);
  winner = someoneWon(board);
  if (winner) break;

  turn = (turn === "Player") ? "Computer" : "Player";
  displayBoard(board);
}

displayBoard(board);
if (winner) {
  prompt(`${winner} won!`);
  score[winner] += 1;
} else {
  prompt('Tie Game');
}


