document.getElementById('submit').addEventListener('click', startGame);

let player1, player2, currentPlayer, board, isGameActive;

function startGame() {
    // Get player names
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        // Hide the player form and show the Tic Tac Toe board
        document.getElementById('player-form').classList.add('hidden');
        document.getElementById('tic-tac-toe-board').classList.remove('hidden');

        // Set the current player to Player 1
        currentPlayer = player1;
        board = Array(9).fill('');
        isGameActive = true;

        // Display whose turn it is
        document.getElementById('message').innerText = `${currentPlayer}, you're up!`;

        // Add event listeners to all the cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    } else {
        alert("Please enter names for both players.");
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.id - 1;

    // Check if the cell is already filled or if the game is over
    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    // Mark the cell for the current player
    if (currentPlayer === player1) {
        cell.innerText = 'X';
        board[cellIndex] = 'X';
    } else {
        cell.innerText = 'O';
        board[cellIndex] = 'O';
    }

    // Check if someone has won
    if (checkWinner()) {
        document.getElementById('message').innerText = `${currentPlayer}, congratulations you won!`;
        isGameActive = false;
        return;
    }

    // Check if it's a tie
    if (!board.includes('')) {
        document.getElementById('message').innerText = `It's a tie!`;
        isGameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.getElementById('message').innerText = `${currentPlayer}, you're up!`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
