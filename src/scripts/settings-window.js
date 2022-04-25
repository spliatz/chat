import {WIDGET_UI, SETTINGS__WINDOW} from './config';

export default class settingsWindow {
    constructor() {
        this.WIDGET = WIDGET_UI.WIDGET;
        this.SETTING__BTN = WIDGET_UI.SETTING__BTN;
        this.WINDOW = SETTINGS__WINDOW.WINDOW;
        this.CLOSE__BTN = SETTINGS__WINDOW.CLOSE__BTN;
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
        this.WINDOW.style.display = 'flex';
        this.WIDGET.style.opacity = '0.3';
    }

    closeWindow() {
        this.WINDOW.style.display = 'none';
        this.WIDGET.style.opacity = '1';
    }
}