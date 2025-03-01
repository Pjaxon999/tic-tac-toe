function boardState(){
    let board = ['', '', '', '', '', '', '', '', ''];

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
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
    let endState = "";
    
    const getPlayer = () => playerTurn;
    const isGameOver = () => gameOver;
    const changePlayer = () => playerTurn = playerTurn === "X" ? "O" : "X";
    const getEndState = () => endState;

    function declareWin(){
        if (playerTurn === "X"){
            gameOver = true;
            endState = "p1win";
        } else {
            gameOver = true;
            endState ="p2win";
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
        
        for (let i = 0; i < array.length; i++) {
            if (playerTurn === "X" && array[i] === "X") {
                indexToCheck.push(i);
            } else if (playerTurn === "O" && array[i] ==="O"){
                indexToCheck.push(i);
            }
        }
    }

    function gameEndCheck(array, combos) {
        let winFound = false;
        for (const combo of combos) {
            if (combo.every(index => array.includes(index))) {
                declareWin();
                winFound = true;
                break;
            }
        }
        indexToCheck = [];
        if (winFound === true) return;
    
        // Check for draw only if no win and board is full
        if (!board.getBoard().includes('')) {
            endState = "draw";
            gameOver = true;
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
            indexReturner(board.getBoard());
            gameEndCheck(indexToCheck, winningCombinations);
            changePlayer();
        }
    };

    const resetGame = () => {
        board.reset();
        gameOver = false;
        endState = "";
        playerTurn = "X";
    };

    return {getPlayer, isGameOver, resetGame, makeMove, exportBoard, getEndState};
}

const render = (function () {
    // Need the game state to render the game.
    const game = gameState();
    // Need to grab DOM elements for rendering
    const introScreen = document.getElementById("intro-screen");
    const gameScreen = document.getElementById("game-screen");
    const turnDisplay = document.querySelector(".player-name");
    const gridCells = document.querySelectorAll(".cell");
    const resetBtn = document.querySelector(".reset-button");
    const startBtn = document.getElementById("start-btn");

    // The names that players input are only relevant to the UI.
    let player1 = {name: "Player 1"};
    let player2 = {name: "Player 2"};

    // let players put in their names before the game starts, trigger transition, switch displays
    startBtn.addEventListener("click", () => {
        player1.name = document.getElementById("player1").value || "Player 1";
        player2.name = document.getElementById("player2").value || "Player 2";
        introScreen.classList.add("hidden");
        introScreen.addEventListener("transitionend", () => {
            introScreen.style.display = "none";
            gameScreen.style.display = "block";
            setTimeout(() => {
                gameScreen.classList.add("visible");
                updateUi();
            }, 10);
        }, {once : true});
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

    // Check to see if the game is still going, if it has ended, read the 
    // end state and react accordingly
    function checkState() {
        if (game.isGameOver() === false) return;
        switch (game.getEndState()) {
            case "draw":
                turnDisplay.textContent = "It's a draw!";
                break;
            case "p1win":
                turnDisplay.textContent = `${player1.name} wins!`;
                break;
            case "p2win": 
                turnDisplay.textContent = `${player2.name} wins!`;
                break;
        }
    }

    function updateUi(){
       playerNameDisplay();
       checkState();
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

    updateUi();
})();