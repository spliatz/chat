import { WIDGET_UI, SETTINGS__WINDOW } from './config';

export default class settingsWindow {
    constructor() {
        this.WIDGET = WIDGET_UI.WIDGET;
        this.SETTING__BTN = WIDGET_UI.SETTING__BTN;
        this.WINDOW = SETTINGS__WINDOW.WINDOW;
        this.CLOSE__BTN = SETTINGS__WINDOW.CLOSE__BTN;
        this.input = WIDGET_UI.INPUT;
        this.inputBtn = WIDGET_UI.WRITE__BTN;
        this.exit = WIDGET_UI.EXIT;
        this.container = WIDGET_UI.CONTAINER;
    }

    init() {
        this.container.scrollIntoView(false);
        this.SETTING__BTN.addEventListener('click', () => {
            this.showWindow();
        });

        this.CLOSE__BTN.addEventListener('click', () => {
            this.closeWindow();
        });
    }

    showWindow() {
        this.WINDOW.style.display = 'flex';
        this.WIDGET.style.display = 'none'
    }

    closeWindow() {
        this.WINDOW.style.display = 'none';
        this.WIDGET.style.display = 'flex'
    }
}
