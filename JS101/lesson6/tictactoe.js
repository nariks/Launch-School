const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const SQUARE_ROWS = 3;
const SQUARE_COLS = 3;
const MAX_SQUARES = BOARD_ROWS * BOARD_COLS;
const CTR_MAX = MAX_SQUARES + (SQUARE_ROWS - 1);

function displayBoard(board) {
  for(let brdRowCtr = 0; brdRowCtr < BOARD_ROWS; brdRowCtr += 1) {
    for (let sqRowCtr = 0; sqRowCtr < SQUARE_ROWS; sqRowCtr += 1) {
      if(sqRowCtr % 2 === 0) {
        console.log('     |     |');
        continue;
      }
      let sq_pos = brdRowCtr * BOARD_COLS;
      console.log(`  ${board[sq_pos]}  |  ${board[sq_pos + 1]}  |  ${board[sq_pos + 2]}`);
    }
    if(brdRowCtr !== BOARD_ROWS - 1) {
      console.log('-----+-----+-----');
    }
  }
}

function board_initialize() {
  let empty_board = {};
  for (let ctr = 0; ctr < MAX_SQUARES; ctr += 1) {
    empty_board[ctr] = ' ';
  }
  return empty_board;
}


let board = board_initialize();
displayBoard(board);



