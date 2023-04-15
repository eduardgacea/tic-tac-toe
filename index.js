const player1ScoreEl = document.getElementById('player-1-score');
const player2ScoreEl = document.getElementById('player-2-score');
const drawsEl = document.getElementById('draws');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalBtn = document.getElementById('modal-btn');
const backdrop = document.getElementById('backdrop');
const cellsEl = document.querySelectorAll('.cell');

// true = X ; false = 0
let player = true;
let remainingMoves = 9;
let playing = true;
let player1Score = 0;
let player2Score = 0;
let draws = 0;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

for (const cell of cellsEl) {
  const cellRow = cell.id.substring(5, 6);
  const cellCol = cell.id.substring(7, 8);
  cell.addEventListener('click', () => {
    clickHandler(cellRow, cellCol);
  });
}

modalBtn.addEventListener('click', resetHandler);

function clickHandler(row, col) {
  if (!document.getElementById(`cell-${row}-${col}`).textContent) {
    document.getElementById(`cell-${row}-${col}`).textContent = player ? 'X' : 'O';
    document.getElementById('player-1-area').classList.toggle('active');
    document.getElementById('player-2-area').classList.toggle('active');
    board[row][col] = player ? 'X' : 'O';
    player = !player;
    remainingMoves--;
    // WINNER
    const winner = checkWinner();
    if (winner) {
      modalTitle.textContent = 'Congratulations!';
      modal.classList.toggle('hidden');
      backdrop.classList.toggle('hidden');
      playing = false;
      if (winner === 'PLAYER 1') modalContent.textContent = 'Player 1 wins';
      if (winner === 'PLAYER 2') modalContent.textContent = 'Player 2 wins';
    }
    // DRAW
    if (!remainingMoves && !checkWinner()) {
      modalTitle.textContent = `It's a draw!`;
      modalContent.textContent = `A well balanced game deserves another`;
      modal.classList.toggle('hidden');
      backdrop.classList.toggle('hidden');
      playing = false;
      draws++;
      drawsEl.textContent = `Draws: ${draws}`;
    }
  }
}

function resetHandler() {
  modal.classList.toggle('hidden');
  backdrop.classList.toggle('hidden');
  playing = true;
  player = true;
  remainingMoves = 9;
  for (const cell of cellsEl) {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  }
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
}

function checkWinner() {
  winner = undefined;
  // CHECK ROWS
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X') {
      winner = 'PLAYER 1';
      player1Score++;
      player1ScoreEl.textContent = player1Score;
      document.getElementById(`cell-${i}-0`).classList.add('winning-cell');
      document.getElementById(`cell-${i}-1`).classList.add('winning-cell');
      document.getElementById(`cell-${i}-2`).classList.add('winning-cell');
    }
    if (board[i][0] === 'O' && board[i][1] === 'O' && board[i][2] === 'O') {
      winner = 'PLAYER 2';
      player2Score++;
      player2ScoreEl.textContent = player2Score;
      document.getElementById(`cell-${i}-0`).classList.add('winning-cell');
      document.getElementById(`cell-${i}-1`).classList.add('winning-cell');
      document.getElementById(`cell-${i}-2`).classList.add('winning-cell');
    }
  }
  // CHECK COLS
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === 'X' && board[1][j] === 'X' && board[2][j] === 'X') {
      winner = 'PLAYER 1';
      player1Score++;
      player1ScoreEl.textContent = player1Score;
      document.getElementById(`cell-0-${j}`).classList.add('winning-cell');
      document.getElementById(`cell-1-${j}`).classList.add('winning-cell');
      document.getElementById(`cell-2-${j}`).classList.add('winning-cell');
    }
    if (board[0][j] === 'O' && board[1][j] === 'O' && board[2][j] === 'O') {
      winner = 'PLAYER 2';
      player2Score++;
      player2ScoreEl.textContent = player2Score;
      document.getElementById(`cell-0-${j}`).classList.add('winning-cell');
      document.getElementById(`cell-1-${j}`).classList.add('winning-cell');
      document.getElementById(`cell-2-${j}`).classList.add('winning-cell');
    }
  }
  // MAIN DIAGONAL
  if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') {
    winner = 'PLAYER 1';
    player1Score++;
    player1ScoreEl.textContent = player1Score;
    document.getElementById('cell-0-0').classList.add('winning-cell');
    document.getElementById('cell-1-1').classList.add('winning-cell');
    document.getElementById('cell-2-2').classList.add('winning-cell');
  }
  if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') {
    winner = 'PLAYER 2';
    player2Score++;
    player2ScoreEl.textContent = player2Score;
    document.getElementById('cell-0-0').classList.add('winning-cell');
    document.getElementById('cell-1-1').classList.add('winning-cell');
    document.getElementById('cell-2-2').classList.add('winning-cell');
  }
  // SECONDARY DIAGONAL
  if (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') {
    winner = 'PLAYER 1';
    player1Score++;
    player1ScoreEl.textContent = player1Score;
    document.getElementById('cell-0-2').classList.add('winning-cell');
    document.getElementById('cell-1-1').classList.add('winning-cell');
    document.getElementById('cell-2-0').classList.add('winning-cell');
  }
  if (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O') {
    winner = 'PLAYER 2';
    player2Score++;
    player2ScoreEl.textContent = player2Score;
    document.getElementById('cell-0-2').classList.add('winning-cell');
    document.getElementById('cell-1-1').classList.add('winning-cell');
    document.getElementById('cell-2-0').classList.add('winning-cell');
  }
  if (winner) {
    playing = false;
  }
  return winner;
}
