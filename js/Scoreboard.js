class Scoreboard {
    constructor(element, levelUpFunction) {
        this.levelUpFunction = levelUpFunction;
        this.element = element;
        this.scoreUp = () => {
            ++this.score;
            if (!(this.score % 20)) {
                ++this.level;
                this.levelUpFunction();
            }
            this.render();
        }

        document.addEventListener('score', this.scoreUp);
        this.reset();
    }

    render() {
        this.element.textContent = `Score: ${this.score} Level: ${this.level}`;
    }

    reset() {
        this.level = 0;
        this.score = 0;
        this.render();
    }
}