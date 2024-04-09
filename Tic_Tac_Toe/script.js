const board = document.getElementById('board');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
}

function handleCellClick(index) {
    if (!gameActive || gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    board.children[index].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        message.innerText = `${winner} wins!`;
        gameActive = false;
    } else if (!gameState.includes('')) {
        message.innerText = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerText =`${currentPlayer}'s turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.innerText = `${currentPlayer}'s turn`;

    for (let cell of board.children) {
        cell.innerText = '';
    }
}

function handleClick(index) {
    if (gameActive) {
        handleCellClick(index);
    }
}

resetGame();