'use strict';

// Выборка элементов
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const getCurrentScorePlayer = function (player) {
  return document.querySelector(`#current--${player}`);
};
const setCurrentScore = function (score = 0, add = 0) {
  return score + add;
};
const toggleField = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const switchPlayer = function () {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  toggleField();
};

let currentPlayer = 0;
let currentScore = setCurrentScore();

let scores = [0, 0];

score0El.textContent = 0;
score1El.textContent = 0;
const resetGame = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player-winner');
  currentPlayer = 0;
  currentScore = setCurrentScore();
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
  if (holdBtn.classList.contains('hidden')) {
    holdBtn.classList.remove('hidden');
  }
};
diceEl.classList.add('hidden');

rollBtn.addEventListener('click', function () {
  if (scores[0] >= 100 || scores[1] >= 100) {
    resetGame();
  }
  const dice = Math.trunc(Math.random() * 6) + 1;
  const currentScorePlayer = getCurrentScorePlayer(currentPlayer);
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  if (dice !== 1) {
    currentScore = setCurrentScore(currentScore, dice);
    currentScorePlayer.textContent = currentScore;
  } else {
    currentScorePlayer.textContent = 0;
    switchPlayer();
  }
});
holdBtn.addEventListener('click', function () {
  const scoreCurrentPlayer = document.querySelector(`#score--${currentPlayer}`);
  const currentScorePlayer = getCurrentScorePlayer(currentPlayer);
  scores[currentPlayer] += currentScore;
  currentScore = setCurrentScore();
  scoreCurrentPlayer.textContent = scores[currentPlayer];
  currentScorePlayer.textContent = currentScore;
  if (scores[currentPlayer] >= 100) {
    scoreCurrentPlayer.textContent = `Player ${
      currentPlayer === 0 ? 1 : 2
    } win!🏆`;
    this.classList.toggle('hidden');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player-winner');
  }
  switchPlayer();
});
newGameBtn.addEventListener('click', resetGame);
