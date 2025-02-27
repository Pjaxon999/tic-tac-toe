function boardState(){
    let board = ['', '', '', '', '', '', '', '', ''];

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        console.log("The game has been reset");
    };

    // The board is needed elsewhere
    const getBoard = () => board;

    return {reset, getBoard};
};

function gameState(){
    const board = boardState();
    const exportBoard = () => board.getBoard();
    let playerTurn = "X";
    let gameOver = false;
    

    const getPlayer = () => playerTurn;
    const isGameOver = () => gameOver;
    const changePlayer = () => playerTurn = playerTurn === "X" ? "O" : "X";

    function declareWin(){
        if (playerTurn === "X"){
            console.log("Player X is the winner!");
            gameOver = true;
        } else {
            console.log("Player O is the winner!");
            gameOver = true;
        }
    }

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
                declareWin();            
            }
         }
        indexToCheck = [];
        if (board.getBoard().includes('')){
            return;
        } else {
            console.log("draw!");
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

    return {getPlayer, isGameOver, resetGame, makeMove, exportBoard};
}

function render(){
    // Need the game state to render the game.
    const game = gameState();
    // Need to grab DOM elements for rendering
    const turnDisplay = document.querySelector(".player-name");
    const gridCells = document.querySelectorAll(".cell");
    const resetBtn = document.querySelector(".reset-button");
    const nameInput = document.querySelector(".name-input");
    const confirmButton = document.getElementById("confirm-btn")
    // let players put in their names before the game starts
    nameInput.showModal();
    confirmButton.addEventListener("click", function(event){
        event.preventDefault();
        player1.name = document.getElementById("player1").value;
        player2.name = document.getElementById("player2").value;
        nameInput.close();
        updateUi();
    });
    // add event listeners to buttons
    gridCells.forEach((button) => button.addEventListener("click", boardClickHandler));
    resetBtn.addEventListener("click", resetClickHandler);

    function playerNameDisplay(){
        if (game.isGameOver() === true){
            return
        }
        if (game.getPlayer() === "X"){
            turnDisplay.textContent = `It is ${player1.name}'s Turn`;
        } else {
            turnDisplay.textContent = `It is ${player2.name}'s Turn`;
        }
    }

    function boardDisplay(){
        let updatedBoard = game.exportBoard();
        for (let i=0; i < gridCells.length; i++){
            gridCells[i].textContent = updatedBoard[i];
        }
    }

    function updateUi(){
       playerNameDisplay();
       boardDisplay();    
    }

    function boardClickHandler(e){
        let index = e.target.getAttribute("data-index");
        game.makeMove(index);
        updateUi();
    }

    // sends the signal to reset the game and update the UI.
    function resetClickHandler(){
        game.resetGame();
        updateUi();
    }
    // The names that players input are only relevant to the UI.
    let player1 = {
        name: "Player 1",
        winCount: 0
    }
    let player2 = {
        name: "Player 2",
        winCount: 0
    }
    
    updateUi();
}

render();