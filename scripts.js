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
    let playerTurn = "X";
    let gameOver = false;

    const getPlayer = () => playerTurn;

    const changePlayer = () => playerTurn = playerTurn === "X" ? "O" : "X";

    const winningCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // verts
        [0,4,8],[2,4,6] // diags
    ];
    
    function gameEndCheck(){
        
    }

    const makeMove = (space) => {
        if (gameOver === true || board.getBoard()[space] !== '' || space < 0 || space >= board.getBoard().length){
            return
        } else {
            board.getBoard()[space] = playerTurn;
            console.log(board);
            gameEndCheck();
        }
        changePlayer();
    };

    const resetGame = () => {
        board.reset();
        gameOver = false;
        playerTurn = "X";
        console.log("Game reset. Current board:", board.getBoard());
    };

    return {getPlayer, resetGame, makeMove};
}

function render(){
    // render relevant game state and board state information to the UI
}

