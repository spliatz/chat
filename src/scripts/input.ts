import { WIDGET_UI as widget } from './config';
import { SERVER } from './server';
import { COOKIE } from './cookie';


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
                SERVER.userAuthorized(`${COOKIE.get('token')}`)
                    .then(res => {
                        if (+res.status === 200) {
                            this.sendServerMessage(this.input.value);
                            this.clearInputField();
                        } else {
                            alert('Вы не авторизованы!');
                            this.clearInputField();
                        }
                    })

            }
        });
        this.button.addEventListener('click', () => {
            if (this.input.value) {
                this.sendServerMessage(this.input.value);
                this.clearInputField();
            }
        });
    }

    sendServerMessage(value: string): void {
        SERVER.sendSocket(value);
    }

    clearInputField(): void {
        console.log('clear');
        this.input.value = '';
    }
}

