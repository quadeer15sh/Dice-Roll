/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, dice, gameState, prevRoll;

init();

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevRoll = 0;
    gameState = true;
    document.querySelector("#score-0").textContent = '0';
    document.querySelector("#score-1").textContent = '0';
    document.querySelector("#current-0").textContent = '0';
    document.querySelector("#current-1").textContent = '0';
    document.querySelector(".dice").style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function changePlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    activePlayer = activePlayer == 1 ? 0 : 1;
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function checkWinner(winningScore) {
    if (score[activePlayer] >= winningScore) {
        gameState = false;
        document.querySelector("#name-" + activePlayer).textContent = 'Winner!';
        document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner')
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active')
        document.querySelector(".dice").style.display = 'none';
    }
    else {
        changePlayer();
    }
}

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameState) {
        prevRoll = dice;
        dice = Math.floor((Math.random() * 6) + 1);
        var diceDOM = document.querySelector(".dice")
        diceDOM.style.display = 'block';

        if (prevRoll == 6 && dice == 6) {
            score[activePlayer] = 0;
            roundScore = 0;
            document.getElementById("score-" + activePlayer).textContent = 0;
            document.getElementById("current-" + activePlayer).textContent = 0;
            changePlayer();
        }
        if (dice == 1) {
            roundScore = 0;
            diceDOM.src = "dice-" + dice + ".png";
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            changePlayer();
        }
        else {
            diceDOM.src = "dice-" + dice + ".png";
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gameState) {
        var input = document.querySelector(".final").value;
        var winningScore = input ? input : 50;
        document.querySelector(".final").value = winningScore;
        score[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
        roundScore = 0;
        checkWinner(winningScore);
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

