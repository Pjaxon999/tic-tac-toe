const board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let playerTurn = "X";
function makeMove(space){
    if (gameOver === false && playerTurn === "X" && board[space] === ''){
        board.splice(space, 1, "X");
    } else if (gameOver === false && playerTurn === "O" && board[space] === ''){
        board.splice(space, 1, "O");
    } else {
        return
    }
    playerTurn = playerTurn === "X" ? "O" : "X";
};
