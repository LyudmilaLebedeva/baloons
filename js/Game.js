class Game {
    constructor(gameFunction, gameOverFunction, resetFunction) {
        this.gameFunction = gameFunction;
        this.gameOverFunction = gameOverFunction;
        this.resetFunction = resetFunction;
        this.interval = 1000,

        this.gameOn = () => {
            this.gameFunction();
            this.timeout = setTimeout(this.gameOn, this.interval);
        };

        this.gameOf = () => clearTimeout(this.timeout);

        this.pauseGameHandler = () => {
            document.removeEventListener('pause', this.pauseGameHandler);
            document.removeEventListener('gameOver', this.gameOverHandler);
            document.addEventListener('play', this.playGameHandler);
            this.gameOf();
        }

        this.playGameHandler = () => {
            document.removeEventListener('play', this.playGameHandler)
            document.addEventListener('pause', this.pauseGameHandler);
            document.addEventListener('gameOver', this.gameOverHandler);
            this.gameOn();
        }

        this.gameOverHandler = () => {
            document.removeEventListener('pause', this.pauseGameHandler);
            document.removeEventListener('gameOver', this.gameOverHandler);
            this.gameOf();
            this.gameOverFunction();
        }

        this.resetGame();
    }

    resetGame()  {
        document.removeEventListener('pause', this.pauseGameHandler);
        document.removeEventListener('gameOver', this.gameOverHandler);
        document.addEventListener('play', this.playGameHandler);
        this.interval = 1000;
        this.gameOf();
        this.resetFunction();
    }
}