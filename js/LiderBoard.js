class LeaderBoard {
    constructor(leaderBoardElement) {
        this.leaderBoardElement = leaderBoardElement;
    }

    _createItem(item) {
        const row = document.createElement('div');
        row.classList.add('row');
        const name = document.createElement('p');
        const score = document.createElement('p');
        name.textContent = item[0];
        score.textContent = item[1];
        row.appendChild(name);
        row.appendChild(score);
        return row;
    }

    render(items) {
        this.leaderBoardElement.textContent = '';
        items.forEach(item => {
            this.leaderBoardElement.appendChild(this._createItem(item));
        });
    }
}