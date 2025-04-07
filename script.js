const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
  updateStatus();
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell)) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winCombos.some(combo =>
    combo.every(index => cells[index] === player)
  );
}

resetBtn.addEventListener('click', () => {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
});

createBoard();