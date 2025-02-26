function boardState(){
    let board = ['', '', '', '', '', '', '', '', ''];

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        console.log("The game has been reset");
    };

    // Allow the board to be updated from elsewhere
    const getBoard = () => board;

    return {reset, getBoard};
};

function gameState(){
    // Store the board state, initialize variables to 
    // track the game state
    const board = boardState();
    let playerTurn = "X";
    let player1 = {
        name : "",
        mark : "X",
        winCount: 0
    }
    let player2 = {
        name: "",
        mark: "O",
        winCount: 0
    }
    let gameOver = false;
    

    const getPlayer = () => playerTurn;

    const changePlayer = () => playerTurn = playerTurn === "X" ? "O" : "X";

    const winningCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // verts
        [0,4,8],[2,4,6] // diags
    ];

    
    // Return an array of the indexes of "X" marks if it is 
    // X's turn, or "O" marks if it is O's turn
    let indexToCheck = [];
    function indexReturner (array){
        
        for (i = 0; i < array.length; i++) {
            if (playerTurn === "X" && array[i] === "X") {
                indexToCheck.push(i);
            } else if (playerTurn === "O" && array[i] ==="O"){
                indexToCheck.push(i);
            }
        }
    }

    function gameEndCheck(array, combos) {
        for (const combo of combos) {
            if (combo.every(index => array.includes(index))) {
                declareGameOver();            
                return true;
            }
         }
        if (array.includes("")){
            return false;
        } else {
            declareGameOver();
        }
    }

    // If a move is valid and the game is still going on, make the move, update the board,
    // and check to see if it was a game ending move (win or draw). If the game is still going,
    // it is now the next players turn.
    const makeMove = (space) => {
        if (gameOver === true || board.getBoard()[space] !== '' || space < 0 || space >= board.getBoard().length){
            return
        } else {
            board.getBoard()[space] = playerTurn;
            console.log(board.getBoard());
            indexReturner(board.getBoard());
            gameEndCheck(indexToCheck, winningCombinations);
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

