let currentPlayer = 'X'; // Player 1 starts as X
let player1 = '';
let player2 = '';
let gameActive = true;

// Get all cells and message element
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');

// Function to start the game and show the board
document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.getElementById('player-info').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateMessage(); // Update the message to show the first turn
    } else {
        alert('Please enter names for both players.');
    }
});

// Function to handle click on a cell
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (gameActive && cell.textContent === '') {
            // Set the content to current player's symbol
            cell.textContent = currentPlayer; // Mark the cell with 'X' or 'O'
            
            // Check for a winner after the click
            checkWinner(); 
            
            // If the game is still active, switch the player
            if (gameActive) switchPlayer(); 
        }
    });
});

// Function to switch player after a move
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(); // Update whose turn it is
}

// Function to update the turn message
function updateMessage() {
    const player = currentPlayer === 'X' ? player1 : player2;
    message.textContent = `${player}, you're up!`; // Show current player's turn
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (
            document.getElementById(a).textContent !== '' &&
            document.getElementById(a).textContent === document.getElementById(b).textContent &&
            document.getElementById(b).textContent === document.getElementById(c).textContent
        ) {
            const winner = currentPlayer === 'X' ? player1 : player2;
            message.textContent = `${winner} congratulations you won!`; // Show winning message
            gameActive = false; // End the game
        }
    });

    // Check for a draw
    if (gameActive && [...cells].every(cell => cell.textContent !== '')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false; // End the game for draw
    }
}
