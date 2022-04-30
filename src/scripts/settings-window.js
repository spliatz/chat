import { WIDGET_UI, SETTINGS__WINDOW } from './config';
import Cookies from 'js-cookie';

export default class settingsWindow {
    constructor() {
        this.WIDGET = WIDGET_UI.WIDGET;
        this.SETTING__BTN = WIDGET_UI.SETTING__BTN;
        this.exit = WIDGET_UI.EXIT;
        this.container = WIDGET_UI.CONTAINER;
        this.WINDOW = SETTINGS__WINDOW.WINDOW;
        this.CLOSE__BTN = SETTINGS__WINDOW.CLOSE__BTN;
        this.input = SETTINGS__WINDOW.INPUT;
        this.btn = SETTINGS__WINDOW.BTN;
        this.name = '';
    }

    init() {
        this.eventListener();
    }

    eventListener() {

        this.input.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.setName(this.input.value);
                this.input.value = '';
            }
        });

        this.SETTING__BTN.addEventListener('click', () => {
            this.showWindow();
        });

        this.CLOSE__BTN.addEventListener('click', () => {
            this.closeWindow();
            this.input.value = '';
        });
    }

    setName(name) {
        fetch('https://mighty-cove-31255.herokuapp.com/api/user', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'PATCH',
            body: JSON.stringify({name: `${name}`}),
        }).then(res => {
            +res.status === 200 ? Cookies.set('name', name) : this.renderError();
        });
    }

    showWindow() {
        this.WINDOW.style.display = 'flex';
        this.WIDGET.style.display = 'none';
    }

    closeWindow() {
        this.WINDOW.style.display = 'none';
        this.WIDGET.style.display = 'flex';
    }

    renderError() {
        this.input.value = '';
        this.input.style.background = '#f29e8c';
        setTimeout(() => this.input.style.background = '', 1000);
    }
}
