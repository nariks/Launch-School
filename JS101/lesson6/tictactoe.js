const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const SQUARE_ROWS = 3;      //Square rows must be odd;
const SQUARE_COLS = 9;      //Square cols must be odd;
const MAX_SQUARES = BOARD_ROWS * BOARD_COLS;
const SPACE_FILLER = Array(SQUARE_COLS).fill(' ').join('');
const SEPARATOR = Array(SQUARE_COLS).fill('-').join('');

function displayPositions(board, row) {
  let padWidth = (SQUARE_COLS - 1) / 2;
  let padding = Array(padWidth).fill(' ').join('');
  let sliceStart = row * BOARD_COLS;
  let sliceEnd = sliceStart + BOARD_COLS;
  let positions = board.slice(sliceStart, sliceEnd);
  positions = positions.map( position => padding + position + padding);
  let positionRow = positions.join('|');
  console.log(positionRow);
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


let board = initializeBoard();
board[1] = 'X';
displayBoard(board);


