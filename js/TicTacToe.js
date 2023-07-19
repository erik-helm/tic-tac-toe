'use strict';

let playCount;

export const ticTacToe = {
  plays: [],
  isGameOver: false,
  winner: null,
  play: position => {
    if (handlePlay(position, player)) {
      counterPlay();
    }
  },
};

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const player = 'X';
const opponent = 'O';
const potentialWins = new Map();

initialize();

function initialize() {
  playCount = 0;

  potentialWins.set(player, []);
  potentialWins.set(opponent, []);
  wins.forEach(item => {
    potentialWins.get(player).push({ active: true, remaining: new Set(item) });
    potentialWins.get(opponent).push({ active: true, remaining: new Set(item) });
  });

  ticTacToe.winner = null;
  ticTacToe.isGameOver = false;
  ticTacToe.plays = Array(9).fill('');
}

function canPlay(position) {
  if (ticTacToe.isGameOver) return false;
  if (ticTacToe.plays[position]) return false;
  if (position > ticTacToe.plays.length - 1) return false;
  return true;
}

function isWinner(whichPlayer) {
  let won;
  for (const win of wins) {
    won = true;
    for (const position of win) {
      if (ticTacToe.plays[position] !== whichPlayer) {
        won = false;
        break;
      }
    }

    if (won) {
      return true;
    }
  }
  return false;
}

function counterPlay() {
  let position = getAvailableWin() ?? getAvailableBlock() ?? getAvailablePotenital();

  if (position != null) {
    return handlePlay(position, opponent);
  }

  const availablePositions = [];

  ticTacToe.plays.forEach((item, index) => {
    if (!item) {
      availablePositions.push(index);
    }
  });

  position = randomElement(availablePositions);

  if (position >= 0) {
    handlePlay(position, opponent)
  }
}

function handlePlay(position, whichPlayer) {
  if (!canPlay(position)) return false;

  ticTacToe.plays[position] = whichPlayer;
  playCount++;

  const otherPlayer = whichPlayer === player ? opponent : player;

  wins.forEach((item, index) => {
    if (item.includes(position)) {
      potentialWins.get(whichPlayer)[index].remaining.delete(position)
      potentialWins.get(otherPlayer)[index].active = false;
    }
  });

  if (isWinner(whichPlayer)) {
    ticTacToe.winner = whichPlayer;
    ticTacToe.isGameOver = true;
    return false;
  }

  if (playCount === ticTacToe.plays.length) {
    ticTacToe.isGameOver = true;
    return false;
  }

  return true;
}

function getAvailableWin() {
  for (const item of potentialWins.get(opponent)) {
    if (item.active && item.remaining.size === 1) {
      const remaining = Array.from(item.remaining.values());
      return remaining[0];
    }
  }

  return null;
}

function getAvailableBlock() {
  const blocks = potentialWins.get(player).filter(item => item.active && item.remaining.size === 1);

  if (blocks.length > 0) {
    const randomBlock = randomElement(blocks);
    const remaining = Array.from(randomBlock.remaining.values());
    return randomElement(remaining);
  }

  return null;
}

function getAvailablePotenital() {
  const potentials = potentialWins.get(opponent).filter(item => item.active);

  if (potentials.length > 0) {
    const randomPotential = randomElement(potentials);
    const remaining = Array.from(randomPotential.remaining.values());
    return randomElement(remaining);
  }

  return null;
}

function randomElement(array) {
  if (array.length === 0) return null;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}