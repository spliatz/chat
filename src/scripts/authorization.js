import { WIDGET_UI } from './config';

export default class authorization {
    constructor() {
        this.authorizationBlock = WIDGET_UI.AUTHORIZATION;
        this.widget = WIDGET_UI.WIDGET;
        this.exit = WIDGET_UI.EXIT;
        this.closeAuthorization = WIDGET_UI.AUTHORIZATION__CLOSE;
    }

    init() {
        this.exit.addEventListener('click', () => {
            this.showWindow();
        })

        this.closeAuthorization.addEventListener('click', () => {
            this.closeWindow();
        })

    }

    showWindow() {
        this.authorizationBlock.style.display = 'flex';
        this.widget.style.display = 'none';
    }

    closeWindow() {
        this.authorizationBlock.style.display = 'none';
        this.widget.style.display = 'flex';
    }
}
