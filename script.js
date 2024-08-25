// Constants
const BOARD_SIZE = 9; // Standard 9x9 Sudoku board

// Initialize an empty Sudoku board
function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
}

// Function to print the board to the console
function printBoard(board) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    console.log(board[i].join(" "));
  }
}

// Function to check if a number is valid in a specific position
function isValid(board, row, col, num) {
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[row][x] === num) return false;
  }
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[x][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

// Recursive function to solve the Sudoku board
function solveSudoku(board) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= BOARD_SIZE; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Function to render the Sudoku board in the HTML
function renderBoard(board) {
  const boardElement = document.getElementById("sudoku-board");
  boardElement.innerHTML = ""; // Clear previous content

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = "1";
      input.value = board[row][col] === 0 ? "" : board[row][col];
      input.oninput = () => {
        board[row][col] = parseInt(input.value) || 0;
      };

      cell.appendChild(input);
      boardElement.appendChild(cell);
    }
  }
}

// Function to handle the "Solve Sudoku" button click
function solve() {
  if (solveSudoku(board)) {
    renderBoard(board);
    alert("Sudoku solved!");
  } else {
    alert("No solution exists!");
  }
}

// Example: Generate and display an initial Sudoku board
let board = createEmptyBoard();
board[0][0] = 5;
board[1][1] = 6;
board[2][2] = 7;
board[3][3] = 8;
board[4][4] = 9;
board[5][5] = 1;
board[6][6] = 2;
board[7][7] = 3;
board[8][8] = 4;

renderBoard(board);
