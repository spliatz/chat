import {WIDGET_UI, SETTINGS__WINDOW} from './config';

export default class settingsWindow {
    constructor() {
        this.WIDGET = WIDGET_UI.WIDGET;
        this.SETTING__BTN = WIDGET_UI.SETTING__BTN;
        this.WINDOW = SETTINGS__WINDOW.WINDOW;
        this.CLOSE__BTN = SETTINGS__WINDOW.CLOSE__BTN;
        this.input = WIDGET_UI.INPUT;
        this.inputBtn = WIDGET_UI.WRITE__BTN;
        this.exit = WIDGET_UI.EXIT;
    }

    init() {
        this.SETTING__BTN.addEventListener('click', () => {
           this.showWindow();
        })

        this.CLOSE__BTN.addEventListener('click', () => {
            this.closeWindow();
        })
    }

    showWindow() {
        this.input.setAttribute('disabled', '');
        this.input.style.userSelect = 'none';
        this.inputBtn.setAttribute('disabled', '')
        this.inputBtn.style.cursor = 'default';
        this.exit.setAttribute('disabled', '')
        this.exit.style.cursor = 'default';
        this.SETTING__BTN.setAttribute('disabled', '')
        this.SETTING__BTN.style.cursor = 'default';
        this.WINDOW.style.display = 'flex';
        this.WIDGET.style.opacity = '0.5';
    }

    closeWindow() {
        this.input.removeAttribute('disabled');
        this.inputBtn.removeAttribute('disabled');
        this.inputBtn.style.cursor = 'pointer';
        this.input.style.userSelect = 'text';
        this.exit.removeAttribute('disabled')
        this.exit.style.cursor = 'pointer';
        this.SETTING__BTN.removeAttribute('disabled')
        this.SETTING__BTN.style.cursor = 'pointer';
        this.WINDOW.style.display = 'none';
        this.WIDGET.style.opacity = '1';
    }
}