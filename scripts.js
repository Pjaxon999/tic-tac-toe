// Test external link
console.log("I HAVE NO IDEA WHAT I AM DOING!");

// Store and update gameboard state. Should be able to retrieve board state,
// read the board state out to the console
function gameState() {
    // store the "board", should start as empty
    const boardSpace = ['', '', '', '', '', '', '', '', ''];
    console.log(boardSpace);
};

// Logic for when a round is played
function moveMade() {
    if (gameOver = true){
        return
    }
    // the entire logic of the game I guess

    playerToggle();
    render();
};

// Change the player after a valid move
function playerToggle() {
    let currentPlayer = "X"
    currentPlayer = currentPlayer === "X" ? "X" : "O";
};

// Make sure nobody has won yet, if they have, let everybody know!
function winChecker() {
// miraculously check if someone won somehow
// after someone wins or a draw is declared, the game should probably end.
};

// Display the game state on the web page 
function render() {

};

// Connect the UI to the Game State
// insert eventListener here

// Render the game when the page loads
render();