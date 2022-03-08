'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const dieImage = document.querySelector('.dice');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

// Generate a random die roll
const generateRoll = function() {
    return Math.trunc(Math.random() * 6) + 1;
}

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function() {

    // Reset/initialize internal game state variables
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Reset scores
    score0Element.textContent = '0';
    score1Element.textContent = '0';

    // Reset current scores
    current0Element.textContent = '0';
    current1Element.textContent = '0';

    // Reset winner class
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    // Reset die image
    dieImage.classList.add('hidden');

    // Reset active player class
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
}

// Changes due to player switch
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
    currentScore = 0;
}

// Initialize game state
init();

// Die rolling functionality
rollButton.addEventListener('click', function() {
    if (playing) {
        let currentDieValue = generateRoll();

        // Display die
        dieImage.classList.remove('hidden');
        dieImage.src = `dice-${currentDieValue}.png`;

        if (currentDieValue === 1) {
            switchPlayer();

            // Reset current score to 0
            currentScore = 0;

        } else {
            // Add dice roll to current score
            currentScore += currentDieValue;

            // Display new score
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    }
})

// Hold button functionality
holdButton.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);

        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dieImage.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
})

// New game functionality
newGameButton.addEventListener('click', init);