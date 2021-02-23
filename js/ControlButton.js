class ControlButton {
    constructor(element) {
        this.element = element;

        this.playClickHandler = (e) => {
            e.target.textContent = 'Pause';
            e.target.removeEventListener('click', this.playClickHandler);
            e.target.addEventListener('click', this.pauseClickHandler);
            document.dispatchEvent(new CustomEvent('play'));
        }

        this.pauseClickHandler = (e) => {
            e.target.textContent = 'Play';
            e.target.removeEventListener('click', this.pauseClickHandler);
            e.target.addEventListener('click', this.playClickHandler);
            document.dispatchEvent(new CustomEvent('pause'));
        }

        this.reset = () => {
            this.element.textContent = 'Start';
            this.element.removeEventListener('click', this.pauseClickHandler);
            this.element.addEventListener('click', this.playClickHandler);
            controlButton.element.style = 'display: block';
        }

        this.element.textContent = 'Start';
        this.element.addEventListener('click', this.playClickHandler);
    }
}