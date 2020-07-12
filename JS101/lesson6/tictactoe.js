const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const SQUARE_ROWS = 3;      //Square rows must be odd;
const SQUARE_COLS = 5;
const MAX_SQUARES = BOARD_ROWS * BOARD_COLS;
const CTR_MAX = MAX_SQUARES + (SQUARE_ROWS - 1);
const SPACE_FILLER = Array(SQUARE_COLS).fill(' ').join('');
const SEPARATOR = Array(SQUARE_COLS).fill('-').join('');

function displayPositions(board, row) {
  let start = row * BOARD_COLS;
  let end = (row * BOARD_COLS) + BOARD_COLS;
  let positions = board.slice(start, end);
  positions = positions.map( position => `  ${position}  `);
  positionRow = positions.join('|');
  console.log(positionRow);
}

function displaySquares(board, row){
  for(let sqRow = 0; sqRow < SQUARE_ROWS; sqRow += 1) {
    if(sqRow === (SQUARE_ROWS - 1) / 2) {
      displayPositions(board, row);
      continue;
    }
    console.log(Array(BOARD_COLS).fill(SPACE_FILLER).join('|'));
  }
}

function displayBoard(board) {
  console.clear();
  for(let brdRow = 0; brdRow < BOARD_ROWS; brdRow += 1) {
    displaySquares(board, brdRow);
    if(brdRow !== BOARD_ROWS - 1) {
      console.log(Array(BOARD_COLS).fill(SEPARATOR).join('+'));
    }
  }
}

function board_initialize() {
  let empty_board = [];
  for (let ctr = 0; ctr < MAX_SQUARES; ctr += 1) {
    empty_board[ctr] = ' ';
  }
  return empty_board;
}


let board = board_initialize();
board[1] = 'X';
displayBoard(board);



