let score = 0;

const playButton = document.querySelector('.play');

const startHandler = (e) => {
    lb.leaderBoardElement.style = "display: none;"
    score = 0;
    document.querySelector('.score').textContent = 'Счет: 0'
    
    e.target.textContent = 'Пауза';
    e.target.removeEventListener('click', startHandler);
    e.target.addEventListener('click', pauseClickHandler);
    createBaloons();
}

playButton.addEventListener('click', startHandler);

function playClickHandler(e) {
    document.dispatchEvent(new CustomEvent('play'));
    e.target.textContent = 'Пауза';
    e.target.removeEventListener('click', playClickHandler);
    e.target.addEventListener('click', pauseClickHandler);
}

function pauseClickHandler(e) {
    document.dispatchEvent(new CustomEvent('pause'));
    e.target.textContent = 'Продолжить';
    e.target.removeEventListener('click', pauseClickHandler);
    e.target.addEventListener('click', playClickHandler);
}

let createTimeout;
document.addEventListener('gameOver', () => { clearTimeout(createTimeout) });
document.addEventListener('pause', () => { clearTimeout(createTimeout) });
document.addEventListener('play', createBaloons);

function createBaloons() {
    createBaloon(Math.random() * 80);
    createTimeout = setTimeout(createBaloons, 1000);   
}

function createBaloon(coordX) {
    const coord = { Y: 0, X: coordX, };
    const scoreElement = document.querySelector('.score');
    const field = document.querySelector('.field');
    let baloon = field.appendChild(document.createElement('div'));

    baloon.style = `left: ${coord.X}vw; bottom: ${coord.Y}vh;`;
    baloon.classList.add('baloon');

    let timeout = setTimeout(move, 40);

    function move() {
        if (baloon) {
            coord.Y += 1;
            baloon.style = `left: ${coord.X}vw; bottom: ${coord.Y}vh`;
            if (coord.Y > 85) { 
                document.dispatchEvent(new CustomEvent('gameOver'));
                gameOver();
              }
            else timeout = setTimeout(move, 100);
        }
    }

    const playBaloonHandler = () => {
        baloon.removeEventListener('play', playBaloonHandler);
        baloon.addEventListener('click', burstBaloonHandler);
        move();
    }

    const pauseBaloonHandler = () => {
        baloon.removeEventListener('click', burstBaloonHandler);
        document.addEventListener('play', playBaloonHandler);
        clearTimeout(timeout);
    }

    const baloonRemove = () => {
        clearTimeout(timeout);
        document.removeEventListener('pause', pauseBaloonHandler);
        document.removeEventListener('gameOver', gameOverBaloonHandler);
        baloon.removeEventListener('click', burstBaloonHandler);
        document.removeEventListener('play', playBaloonHandler);
        baloon.remove();
    }

    const gameOverBaloonHandler = () => {
        baloonRemove();
    }

    const burstBaloonHandler = () => {
        scoreElement.textContent = `Счет: ${++score}`;
        baloonRemove();
    }

    baloon.addEventListener('click', burstBaloonHandler);
    document.addEventListener('pause', pauseBaloonHandler);
    document.addEventListener('gameOver', gameOverBaloonHandler);
}

const lb = new LeaderBoard(document.querySelector('.leaderboard'));

const form = document.querySelector('.form');

function gameOver() {
    playButton.style = 'display: none;'
    playButton.removeEventListener('click', pauseClickHandler);

    form.style = 'display: block';    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (score) {
        const name = form.querySelector('input').value;
        const leaderboard = JSON.parse((window.localStorage.getItem('leaderboard') || '[]'));
        leaderboard.push([(name || 'noname'), score]);
        score = 0;
        window.localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        form.querySelector('input').value = '';
        e.target.style = 'display: none;';
        leaderboard.sort((a, b) => b[1] - a[1]);
        form.style = 'display: none;';
        playButton.textContent = 'Начать новую игру';
        playButton.style = 'display: block;';
        playButton.addEventListener('click', startHandler);
        lb.leaderBoardElement.style = "display: block;";
        lb.render(leaderboard);
    }
});
