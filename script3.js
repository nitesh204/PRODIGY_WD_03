const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(cell) {
    const cellIndex = Array.from(board).indexOf(cell);
    
    if (gameBoard[cellIndex] === '' && !gameOver) {
        gameBoard[cellIndex] = currentPlayer;
        
        // Add a class to the cell containing "X" or "O" for custom styling
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x-symbol' : 'o-symbol');
        
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if (gameBoard.every((cell) => cell !== '')) {
            message.textContent = 'It\'s a draw!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-symbol', 'o-symbol'); // Remove the custom class
    });
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = 'Player X\'s turn';
}

resetButton.addEventListener('click', resetBoard);
