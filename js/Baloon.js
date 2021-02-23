class Baloon {
    constructor(props, field) {
        this.step = props.step;
        this.interval = props.interval;
        this.width = props.width;
        this.height = props.height;
        this.maxY = props.maxY;
        this.sound = props.sound;
        this.y = -this.height;
        this.x = this.getRandomX();
        this.field = field;

        this.baloonRemove = () => {
            clearTimeout(this.timeout);
            document.removeEventListener('pause', this.pauseBaloonHandler);
            document.removeEventListener('gameOver', this.baloonRemove);
            document.removeEventListener('play', this.playBaloonHandler);
            this.element.removeEventListener('mousedown', this.burstBaloonHandler);
            this.element.classList.add('bump');
            setTimeout(() => {
                this.element.remove();
            }, 250) ;
        }

        this.burstBaloonHandler = () => {
            this.sound.currentTime = .4;
            this.sound.play();
            document.dispatchEvent(new CustomEvent('score'));
            this.baloonRemove();
        }

        this.playBaloonHandler = () => {
            this.element.removeEventListener('play', this.playBaloonHandler);
            this.element.addEventListener('mousedown', this.burstBaloonHandler);
            this.move();
        }

        this.pauseBaloonHandler = () => {
            this.element.removeEventListener('mousedown', this.burstBaloonHandler);
            document.addEventListener('play', this.playBaloonHandler);
            clearTimeout(this.timeout);
        }

        this.move = () => {
            if (this.element) {
                this.setPosition(this.x, this.y + this.step);

                if (this.y > this.maxY) { 
                    document.dispatchEvent(new CustomEvent('gameOver'));
                }
                else this.timeout = setTimeout(this.move, this.interval);
            }
        }

        this.create();
    }

    create() {
        this.element = document.createElement('div');
        this.element.classList.add(`baloon_${Math.ceil(Math.random()*4)}`);
        this.element.classList.add('baloon');
        this.element.addEventListener('mousedown', this.burstBaloonHandler);
        document.addEventListener('pause', this.pauseBaloonHandler);
        document.addEventListener('gameOver', this.baloonRemove);
        this.setPosition();
        this.field.appendChild(this.element);

        this.timeout = setTimeout(this.move, this.interval);
    }

    setPosition(x = this.x, y = this.y) {
        this.x = x;
        this.y = y;
        this.element.style = `left: ${x}vw; bottom: ${y}vh;`;
    }

    getRandomX() {
        return Math.random() * (100 - this.width);
    }
}