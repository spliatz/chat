import { WIDGET_UI } from './config';
import { AUTHORIZATION__WINDOW } from './config';
import { USERS } from './config';
import { CONFIRMATION__WINDOW } from './config';
import Cookies from 'js-cookie';

export default class authorization {
    constructor() {
        this.name = USERS.USER__DEFAULT;
        //
        this.widget = WIDGET_UI.WIDGET;
        this.exit = WIDGET_UI.EXIT;
        //
        this.authorizationBlock = AUTHORIZATION__WINDOW.WRAPPER;
        this.closeAuthorization = AUTHORIZATION__WINDOW.CLOSE;
        this.emailInput = AUTHORIZATION__WINDOW.INPUT;
        this.emailBtn = AUTHORIZATION__WINDOW.BTN;
        //
        this.confirmWrapper = CONFIRMATION__WINDOW.WRAPPER;
        this.confirmClose = CONFIRMATION__WINDOW.CLOSE;
        this.codeInput = CONFIRMATION__WINDOW.INPUT;
        this.codeBtn = CONFIRMATION__WINDOW.BTN;
        //
        this.email = '';
        //
        this.confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
        this.aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
        //
    }

    init() {
        this.eventListener();
    }

    eventListener() {
        this.exit.addEventListener('click', () => {
                this.showAuthorizationWindow();
                this.closeWidget();
        });

        this.closeAuthorization.addEventListener('click', () => {
            this.closeAuthorizationWindow();
            this.showWidget();
        });

        this.emailInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (this.emailInput.value.length > 4 && this.emailInput.value.includes('@')
                    && this.emailInput.value.includes('.')) {
                    this.setEmail(this.emailInput.value);
                    this.requestAuthorization();
                    this.showConfirmWindow();
                    this.closeAuthorizationWindow();
                } else {
                    this.emailInput.value = '';
                    this.emailInput.style.background = '#f29e8c';
                    setTimeout(() => this.emailInput.style.background = '', 1000);
                }
            }
        });

        this.emailBtn.addEventListener('click', () => {
            if (this.emailInput.value.length > 4 && this.emailInput.value.includes('@')
                && this.emailInput.value.includes('.')) {
                this.setEmail(this.emailInput.value);
                this.requestAuthorization();
                this.showConfirmWindow();
                this.closeAuthorizationWindow();
            } else {
                this.emailInput.value = '';
                this.emailInput.style.background = '#f29e8c';
                setTimeout(() => this.emailInput.style.background = '', 1000);
            }
        });

        this.codeInput.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.codeInput) {
                this.setCodeInCookie(this.codeInput.value);
                this.codeInput.value = '';
                this.closeConfirmWindow();
                this.showWidget();
            }
        });

        this.codeBtn.addEventListener('click', () => {
            if (this.codeInput) {
                this.setCodeInCookie(this.codeInput.value);
                this.codeInput.value = '';
                this.closeConfirmWindow();
                this.showWidget();
            }
        });

        this.confirmClose.addEventListener('click', () => {
            this.closeConfirmWindow();
            this.showWidget();
        });
    }


    requestAuthorization() {
        const response = fetch(this.confirmAdress,
            {
                'headers': {'Content-Type': 'application/json'},
                'method': 'POST',
                body: JSON.stringify({email: `${this.email}`}),
            });
    }

    setEmail(email) {
        this.email = email;
        Cookies.set('email', this.email);
    }

    setCodeInCookie(code) {
        Cookies.set('token', code);
    }

    showWidget() {
        this.widget.style.display = 'flex';
    }

    closeWidget() {
        this.widget.style.display = 'none';
    }

    showAuthorizationWindow() {
        this.authorizationBlock.style.display = 'flex';
    }

    closeAuthorizationWindow() {
        this.authorizationBlock.style.display = 'none';
        this.emailInput.value = '';
    }

    showConfirmWindow() {
        this.confirmWrapper.style.display = 'flex';
    }

    closeConfirmWindow() {
        this.confirmWrapper.style.display = 'none';
        this.codeInput.value = '';
    }

}
