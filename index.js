const leaderboard = new Leaderboard(document.querySelector('.leaderboard'));
const scoreboard = new Scoreboard(document.querySelector('.scoreboard'), levelUp);
const controlButton = new ControlButton(document.querySelector('.control-button'));
const form = new NameForm(document.querySelector('.form'), withSubmit);
const game = new Game(gameFunction, gameOverFunction, resetFunction);

const bumpSound =  new Audio('./audio/bump.mp3');
const babahSound = new Audio('./audio/babah.mp3');

const baloonProps = {
    step: .5,
    interval: 20,
    maxY: 100,
    radius: 5,
    sound:  bumpSound,
}

function gameFunction() {
    new Baloon(baloonProps, document.querySelector('.field'));
}

function gameOverFunction() {
    babahSound.currentTime = 1;
    babahSound.play();
    if (!scoreboard.score) {
        game.resetGame();
    } else {
        form.open();
        controlButton.element.style = 'display: none';
    }
}

function resetFunction() {
    form.close();
    leaderboard.hide();
    scoreboard.reset();
    controlButton.reset();
}

function withSubmit(name) {
    controlButton.element.textContent = 'OK';
    controlButton.element.style = 'display: block;';
    leaderboard.addLeaderboardData(name, scoreboard.score);
    leaderboard.render();
    leaderboard.show();
    controlButton.element.addEventListener('click', resetGameHandler);
}

function resetGameHandler(e) {
    e.target.removeEventListener('click', resetGameHandler);
    game.resetGame();
}

function levelUp() {
    game.interval /= 1.2;
}