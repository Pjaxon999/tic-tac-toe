function boardState(){
    let board = ['', '', '', '', '', '', '', '', ''];

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        console.log("The game has been reset");
    };

    const getBoard = () => board;

    return {reset, getBoard};
};

function gameState(){
    const board = boardState();
    const playerTurn = "X";
    const getPlayer = () => playerTurn;

    // Loop through each combination in winningCombinations.
    // For each combination, check if all three indices in the board array have the same value (X or O).
    // If any combination meets this condition, return true (a winner exists).
    // Check to see if anyone has won or if there is a draw
    const winningCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // verts
        [0,4,8],[2,4,6] // diags
    ];
    
    function gameEndCheck(){
        
    }

    const makeMove = (space) => {
        if (gameOver === true || board[space] !== '' || space < 0 || space >= board.length){
            return
        } else {
            board[space] = playerTurn;
            console.log(board);
            gameEndCheck();
            playerTurn = playerTurn === "X" ? "O" : "X";
        }
    };

    return {getPlayer};
}

function render(){
    // render relevant game state and board state information to the UI
}

