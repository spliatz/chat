import { WIDGET_UI as widget } from './config';


interface Iinput {
    input: HTMLInputElement;
    button: HTMLButtonElement;

}

export class INPUT implements Iinput {
    input: HTMLInputElement;
    button: HTMLButtonElement;

    constructor() {
        this.input = widget.INPUT;
        this.button = widget.WRITE__BTN;
    }

    init() {
        this.listener();
    }

    listener() {
        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && this.input.value) {
                this.sendServerMessage(this.input.value);
                this.clearInputField();
            }
        });
        this.button.addEventListener('click', (event) => {
            if (this.input.value) {
                this.sendServerMessage(this.input.value);
                this.clearInputField();
            }
        });
    }

    sendServerMessage(value: string): void {
        alert(value);
    }

    clearInputField(): void {
        console.log('clear');
        this.input.value = '';
    }
}

