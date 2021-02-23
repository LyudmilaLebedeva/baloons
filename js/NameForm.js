class NameForm {
    constructor(element, withSubmit) {
        this.element = element;
        this.inputElement = this.element.querySelector('.input');
        this.withSubmit = withSubmit;

        this.submitHandler = (e) => {
            e.preventDefault();
            const name = this.inputElement.value || 'Noname';
            this.close();
            withSubmit(name);
        };
    }

    open() {
        this.element.addEventListener('submit', this.submitHandler);
        this.element.style = 'display: block;';
    }

    close() {
        this.element.removeEventListener('submit', this.submitHandler);
        this.inputElement.value = '';
        this.element.style = 'display: none;';
    }
}