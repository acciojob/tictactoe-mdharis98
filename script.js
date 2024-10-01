const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const board = document.querySelector('.board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

// Variables to track the game
let player1 = '';
let player2 = '';
let currentPlayer = '';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

function startGame() {
  player1 = player1Input.value;
  player2 = player2Input.value;
  
  if (player1 && player2) {
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
    board.style.display = 'block';
  } else {
    alert('Please enter names for both players');
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id) - 1;
  
  if (boardState[cellIndex] === '' && !isGameOver) {
    boardState[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
    cell.textContent = boardState[cellIndex];
    checkWinner();
    switchPlayer();
  }
}

function switchPlayer() {
  if (!isGameOver) {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
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

  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      isGameOver = true;
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
    }
  });

  if (!boardState.includes('') && !isGameOver) {
    messageDiv.textContent = `It's a tie!`;
    isGameOver = true;
  }
}
submitButton.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));



