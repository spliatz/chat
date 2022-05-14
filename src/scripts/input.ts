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
        this.input.addEventListener('keydown', (event): void => {
            if (event.key === 'Enter' && this.input.value) {
                this.sendMessageToServerAndRenderCallback(this.input.value);
            }
        });
        this.button.addEventListener('click', (): void => {
            if (this.input.value) {
                this.sendMessageToServerAndRenderCallback(this.input.value);
            }
        });
    }

    private sendMessageToServerAndRenderCallback(name: string): void {
        SERVER.userAuthorized(`${COOKIE.get('token')}`)
            .then(res => {
                if (+res.status === 200) {
                    this.sendServerMessage(name);
                    this.clearInputField();
                } else {
                    alert('Вы не авторизованы!');
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

