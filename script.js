 let player1 = "";
      let player2 = "";
      let currentPlayer = "";
      let gameBoard = Array(9).fill(null);
      let isGameOver = false;

      // Start game button click event
      document.getElementById("submit").addEventListener("click", function () {
        player1 = document.getElementById("player-1").value;
        player2 = document.getElementById("player-2").value;
        if (player1 && player2) {
          document.querySelector(".form").classList.add("hidden");
          document.getElementById("game-board").classList.remove("hidden");
          currentPlayer = player1;
          document.getElementById(
            "turn-message"
          ).textContent = `${currentPlayer}, you're up`;
        }
      });

      // Cell click event
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.addEventListener("click", function () {
          if (isGameOver) return;

          const cellIndex = this.id - 1;
          if (!gameBoard[cellIndex]) {
            gameBoard[cellIndex] = currentPlayer === player1 ? "X" : "O";
            this.textContent = gameBoard[cellIndex];
            this.classList.add("taken");

            if (checkWinner()) {
              document.getElementById(
                "turn-message"
              ).textContent = `${currentPlayer}, congratulations you won!`;
              isGameOver = true;
            } else if (gameBoard.every((cell) => cell !== null)) {
              document.getElementById("turn-message").textContent =
                "It's a draw!";
              isGameOver = true;
            } else {
              currentPlayer = currentPlayer === player1 ? player2 : player1;
              document.getElementById(
                "turn-message"
              ).textContent = `${currentPlayer}, you're up`;
            }
          }
        });
      });

      // Check for a winner
      function checkWinner() {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        return winningCombinations.some((combination) => {
          return combination.every((index) => {
            return gameBoard[index] === (currentPlayer === player1 ? "X" : "O");
          });
        });
      }