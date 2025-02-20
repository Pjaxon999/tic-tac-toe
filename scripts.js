// // Test external link
// console.log("Here I am! Tic me like a Tac Toe!");

// // Store and update gameboard state. Should be able to retrieve board state,
// // add an X or O, and read the board state out to the console
// function gameState() {
//     // store the "board", should start as empty
//     const boardSpace = ['', '', '', '', '', '', '', '', ''];


// };

// // Logic for when a round is played
// function moveMade() {
//     if (gameOver = true){
//         return
//     }

// };

// // Change the player after a valid move
// function playerToggle() {

// };

// // Make sure nobody has won yet, if they have, let everybody know!
// function winChecker() {

//     // after someone wins or a draw is declared, the game should probably end.
//     gameOver = true;
// };


// // Rendering function
// function render() {

// };

// Connect the UI to the Game State
// insert eventListener here

// Render the game when the page loads here!


// since I have no fucking clue what I am doing I am just going to pretend all this shit doesn't exist and try to code it how I would normally do it and then try to refactor it after the fact lol yay I am so happy

const board = document.querySelectorAll(".cell");
const gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = "false";
let player = "X";

board.forEach((cell) => {
    cell.addEventListener("click", makeMark)
});

function makeMark(e){
    if (player === "X" && gameOver === "false" && e.target.textContent === '') {
        e.target.textContent = "X";
        let boardIndex = e.target.getAttribute("data-index");
        gameBoard.splice(boardIndex, 1, "X");
        player = "O";
    } else if (player === "O" && gameOver === "false" && e.target.textContent === '') {
        e.target.textContent = "O";
        let boardIndex = e.target.getAttribute("data-index");
        gameBoard.splice(boardIndex, 1, "O");
        player = "X";
    } else {
        return
    }
};