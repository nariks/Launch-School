function displayBoard(board) {
  for(let ctr = 0; ctr < 11; ctr += 1) {
    if ([3,7].includes(ctr)) {
      console.log('-----+-----+-----');
      continue;
    }
    
    if ([1,5,9].includes(ctr)) { 
      let row = (ctr - 1) / 4;
      console.log(`  ${board[row][0]}  |  ${board[row][1]}  |  ${board[row][2]}`);
      continue;
    }

    console.log('     |     |');
  }
}


  let board = [['X',' ',' '],
               ['O',' ',' '],
               [' ',' ','X']];
  displayBoard(board);



