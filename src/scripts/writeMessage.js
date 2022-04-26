import {WIDGET_UI, SETTINGS__WINDOW, USERS} from './config';
import messageTemplate from './config';


export default class writeMessage {
    constructor() {
        this.input = WIDGET_UI.INPUT;
        this.inputBtn = WIDGET_UI.WRITE__BTN;
        this.container = WIDGET_UI.CONTAINER;
    }

    init() {
        this.input.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.input.value) {
                this.sendMessage(this.input.value);
                this.input.value = '';
            }
        })
        this.inputBtn.addEventListener('click', (_) => {
            if (this.input.value) {
                this.sendMessage(this.input.value);
                this.input.value = '';
            }

        })

    }

    sendMessage(value) {
        let date = new Date();
        this.container.innerHTML += messageTemplate(USERS.USER__DEFAULT, value, date.toLocaleTimeString())
    }
}