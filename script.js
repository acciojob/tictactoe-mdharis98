let currentPlayer = 'X'; // Player 1 starts as X
let player1 = '';
let player2 = '';
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');

// Function to start the game and show the board
document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.getElementById('player-info').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateMessage(); // Initialize the message with player 1's turn
    } else {
        alert('Please enter names for both players.');
    }
});

// Function to handle click on a cell
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (gameActive && cell.textContent === '') {
            // Set the cell content to X or O based on the current player
            cell.textContent = currentPlayer;

            // Check if there's a winner after the move
            checkWinner();

            // Switch to the next player
            switchPlayer();
        }
    });
});

// Function to switch player after a move
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch between X and O
    updateMessage(); // Update the message with the next player's turn
}

// Function to update the turn message
function updateMessage() {
    const player = currentPlayer === 'X' ? player1 : player2; // Show the current player's name
    message.textContent = `${player}, you're up!`;
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    // Check each win pattern
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (
            document.getElementById(a).textContent !== '' && 
            document.getElementById(a).textContent === document.getElementById(b).textContent &&
            document.getElementById(b).textContent === document.getElementById(c).textContent
        ) {
            // If we have a winner, stop the game and show a winning message
            const winner = currentPlayer === 'X' ? player1 : player2;
            message.textContent = `${winner}, congratulations! You won!`;
            gameActive = false;
        }
    });

    // Check for a draw if no one has won yet
    if (gameActive && [...cells].every(cell => cell.textContent !== '')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}
