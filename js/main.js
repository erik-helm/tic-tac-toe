'use strict';

import { ticTacToe } from "./TicTacToe.js";

const board = document.querySelector('.board');
board.addEventListener('click', event => {
  if (event.target.classList.contains('tile')) {
    const position = event.target?.dataset?.position;
    if (position != null) {
      ticTacToe.play(parseInt(position));
      updateBoard();
    }
  }
});

const newGameButton = document.querySelector('button');
newGameButton.addEventListener('click', event => {
  window.location.reload();
});

function updateBoard() {
  for (let i = 0; i < 9; i++) {
    const tile = document.querySelector(`[data-position="${i}"]`);
    tile.textContent = ticTacToe.plays[i];
    tile.classList.add(ticTacToe.plays[i] === 'O' ? 'tile--o' : 'tile--x');
  }

  if (ticTacToe.isGameOver) {
    const gameOverAlert = document.querySelector('.game-over-alert');
    gameOverAlert.textContent = 'Game Over!';

    const winnerAlert = document.querySelector('.winner-alert');
    winnerAlert.textContent = ticTacToe.winner === null
      ? 'Draw'
      : `The winner is ${ticTacToe.winner}`;

    newGameButton.classList.remove('new-game--hidden');
  }
}
