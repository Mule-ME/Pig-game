'use strict';

//Selecting DoM element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore, score, activePlayer, isPlaying;

//Initial conditions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice button functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1,Generating random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2,Displaying the dice image based on the dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;
    //3,Checking if rolled dice is 1 or not
    if (dice !== 1) {
      currentScore += dice;
      //Add dice to current score of the current player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Holding or storing score for each players
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //1,Add current score to active player
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2,Check if player's score is >= 100
    if (score[activePlayer] >= 100) {
      //Finish the game
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Refreshing game functionality
btnNew.addEventListener('click', init);
