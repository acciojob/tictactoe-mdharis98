//your JS code here. If required.
let currentPlayer = 'X'; // Player 1 starts as X
let player1 = '';
let player2 = '';
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');

// Function to start the game and show the board
document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.getElementById('player-info').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateMessage();
    } else {
        alert('Please enter names for both players.');
    }
});

// Function to handle click on a cell
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (gameActive && cell.textContent === '') {
            cell.textContent = currentPlayer;
            checkWinner();
            switchPlayer();
        }
    });
});

// Function to switch player after a move
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
}

// Function to update the turn message
function updateMessage() {
    const player = currentPlayer === 'X' ? player1 : player2;
    message.textContent = `${player}, you're up!`;
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
            message.textContent = `${winner}, congratulations! You won!`;
            gameActive = false;
        }
    });

    // Check for a draw
    if (gameActive && [...cells].every(cell => cell.textContent !== '')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}
