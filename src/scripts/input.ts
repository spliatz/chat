import { WIDGET_UI as widget } from './config';


interface Iinput {
    input: HTMLInputElement;
}

export class INPUT implements Iinput {
    input: HTMLInputElement;

    constructor() {
        this.input = widget.INPUT;
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
    }

    sendServerMessage(value: string): void {
        alert(value);
    }

    clearInputField(): void {
        console.log('clear');
        this.input.value = '';
    }
}

