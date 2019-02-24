const Board = function() {
  const board = [["4", "3", "2", "1"], [], []]; // Sets initial board state
  const winCondition = board[0].reduce(((sum, num) => sum + parseInt(num)), 0); // Sets win condition to total of peg1 at start of game
  const numOfDiscs = board[0].length;
  let moveCounter = 0;  // Tracks number of moves
  let playerMessage = 'Welcome! Please select the starting peg and ending peg for your move!'
  document.getElementById('message').innerHTML = playerMessage;
  
  // Outputs the current state of the board to the console
  const boardState = function() {
    console.log('Current Board State: (Moves: ' + moveCounter + ')');
    board.map(function(item) {
    const pegState = item.join(' ');
    console.log('--- ' + pegState);
    });
    console.log(''); // Adds a blank line to console for easier readability
  }
  boardState();  // Puts initial board state into the console before you start game
  
  // Grabs the current state of the board 
  const getBoardState = function() {
    return board;
  }

  const getTotalMoves = function() {
    return moveCounter;
  }

  // Moves a disk from one peg to another if valid move or print error
  const moveDisc = function(pegStart, pegEnd) {
    pegStart = document.getElementById('pegStart').value;
    pegEnd = document.getElementById('pegEnd').value;
    if(errorCheck(pegStart, pegEnd)) {
      const discCanMoveHere = whereCanDiscMove(pegStart);
      pegStartVal = board[pegStart -1];
      pegEndVal = board[pegEnd -1];

      if(discCanMoveHere.indexOf(pegEnd - 1) !== -1) {
        pegEndVal.push(pegStartVal.pop());
      } else {
        console.log('You are not allowed to move a larger disc onto a smaller disc. Try Again!');
        $('#message').html('You are not allowed to move a larger disc onto a smaller disc. Try Again!');
        boardState();
        return;
      }
    moveCounter += 1;
    checkWinner();
    boardState();
  }
}
  // Given the chosen peg you want to move a disc from, returns pegs that are a valid to move to
  const whereCanDiscMove = function(pegStart) {
    const pegStartIndex = pegStart -1;
    return board.map((peg, index) => 
    (peg.length === 0 || board[pegStartIndex][[board[pegStartIndex].length -1]] < peg[peg.length - 1]) ? index : undefined)
    .filter(pegIndex => pegIndex >= 0);
  }

  // Checks if the win condition is met
  const checkWinner = function() {
    const peg2 = board[1].reduce(((sum, num) => sum + parseInt(num)), 0);
    const peg3 = board[2].reduce(((sum, num) => sum + parseInt(num)), 0);
    const winnerSound = document.getElementById('winner');

    if(peg2 === winCondition || peg3 === winCondition) {
      if(moveCounter === Math.pow(2, numOfDiscs) - 1) {
        console.log('AMAZING! You completed the puzzle in the minimum of ' + moveCounter + ' moves!'); 
        $('#message').html('AMAZING! You completed the puzzle in the minimum of ' + moveCounter + ' moves!');
      } else {
      console.log('You win!  This attempt took you a total of ' + moveCounter + ' moves!'); 
      $('#message').html('You win!  This attempt took you a total of ' + moveCounter + ' moves!');
      }
      winnerSound.play();
    }
  }
  
  // Checks for basic errors 
  const errorCheck = function(pegStart, pegEnd) {
    if(pegStart === pegEnd){
      console.log('You tried to move a disc to the peg it is currently on.  Try again!');
      $('#message').html('You tried to move a disc to the peg it is currently on.  Try again!');
      boardState();
      return false;
    } else if((pegStart < 1 || pegStart > board.length) || (pegEnd < 1 || pegEnd > board.length)) {
      console.log('One of the pegs you selected does not exist. Try again!');
      $('#message').html('One of the pegs you selected does not exist. Try again!');
      boardState();
      return false;
    } else if(board[pegStart -1].length === 0) {
      console.log('You tried to move a disc from an empty peg. Try again!');
      $('#message').html('You tried to move a disc from an empty peg. Try again!');
      boardState();
      return false;
    } else{
      return true;
    }
  }

  const resetGame = function() {
    document.location.reload();
  }

    return {
      moveDisc: moveDisc,
      discsStart: board[0].length,
      getBoardState: getBoardState,
      getTotalMoves: getTotalMoves,
      resetGame: resetGame
    }
}

const board = new Board();

// board.moveDisc(1,4);
// board.moveDisc(2,1);
// board.moveDisc(1,1);
// board.moveDisc(1,2);
// board.moveDisc(1,2);
// board.moveDisc(1,3);
// board.moveDisc(1,3);
// board.moveDisc(0,3);
// board.moveDisc(2,3);
// board.moveDisc(1,2);
// board.moveDisc(3,1);
// board.moveDisc(3,2);
// board.moveDisc(1,2);





// // Shortest solution to 3x3
// moveDisc(1,2);
// moveDisc(1,3);
// moveDisc(2,3);
// moveDisc(1,2);
// moveDisc(3,1);
// moveDisc(3,2);
// moveDisc(1,2);