class Leaderboard {
    constructor(element) {
        this.element = element;

        this._createTitle();
        this._readData();

        this.resetDataHandler = () => {
            this.resetData();
            this.render();
        }
    }

    _createResetButton() {
        this.resetButton = document.createElement('button');
        this.resetButton.classList.add('control-button');
        this.resetButton.textContent = 'Reset';
    }

    _createItem(item, index) {
        const row = document.createElement('div');
        row.classList.add('row');
        const name = document.createElement('p');
        const score = document.createElement('p');
        name.textContent = ++index + '. ' + item[0];
        score.textContent = item[1];
        row.appendChild(name);
        row.appendChild(score);
        return row;
    }

    _createTitle() {
        this._createResetButton();
        this.title = document.createElement('p');
        this.title.classList.add('row');
        this.title.style.fontWeight = 900;
        this.title.textContent = 'Leaderboard';
        this.title.appendChild(this.resetButton);
    }

    _readData() {
        this.data = JSON.parse((window.localStorage.getItem('leaderboard') || '[]'));
    }

    resetData() {
        window.localStorage.setItem('leaderboard', "[]");
        this._readData()
    }

    addLeaderboardData(name, score) {
        this.data.push([name, score]);
        this.data.sort((a, b) => b[1] - a[1]);
        window.localStorage.setItem('leaderboard', JSON.stringify(this.data));
    }

    show() {
        this.resetButton.addEventListener('click', this.resetDataHandler);
        this.element.style = "display: block;"
    }

    hide() {
        this.resetButton.removeEventListener('click', this.resetDataHandler);
        this.element.style = "display: none;"
    }

    render() {
        this.element.textContent = '';
        this.element.appendChild(this.title);
        this.data.forEach((item, index) => {
            this.element.appendChild(this._createItem(item, index));
        });
    }
}