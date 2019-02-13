let scores, roundScore, activePlayer, gamePlaying, lastDice;
let btnHoldDOM = document.querySelector('.btn-hold');

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = '0';
            btnHoldDOM.style.display = 'none';
            playErrorFx();
            changePlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
            btnHoldDOM.style.display = 'block';
        } else {
            playErrorFx();
            btnHoldDOM.style.display = 'none';
            changePlayer();
        }

        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {

    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        let input = document.querySelector('.final-score').value;
        let winningScore;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer].toString();

        if (input && input > 0) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        console.log(winningScore);
        if (scores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector('.btn-roll').style.display = 'none';
            btnHoldDOM.style.display = 'none';
            playWinnerFx();
            gamePlaying = false;
        } else {
            changePlayer();
            btnHoldDOM.style.display = 'none';
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function playErrorFx() {
    const err = new Audio('err.mp3');
    err.play();
}

function playWinnerFx() {
    const winnerFx = new Audio('winner.mp3');
    winnerFx.play();
}

function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    btnHoldDOM.style.display = 'none';
}










