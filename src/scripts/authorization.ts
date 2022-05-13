import { COOKIE } from './cookie';
import { AUTHORIZATION__WINDOW, CONFIRMATION__WINDOW } from './config';
import { ChatWidget } from './chat-widget';
import { SERVER } from './server';

interface authorization {
    authorizationWrapper: HTMLDivElement;
    authorizationClose: HTMLButtonElement;
    authorizationInput: HTMLInputElement;
    authorizationButton: HTMLButtonElement;
    //
    confirmWrapper: HTMLDivElement;
    confirmClose: HTMLButtonElement;
    confirmInput: HTMLInputElement;
    confirmButton: HTMLButtonElement;
}

export class AUTHORIZATION implements authorization {
    authorizationWrapper: HTMLDivElement;
    authorizationClose: HTMLButtonElement;
    authorizationInput: HTMLInputElement;
    authorizationButton: HTMLButtonElement;
    //
    confirmWrapper: HTMLDivElement;
    confirmClose: HTMLButtonElement;
    confirmInput: HTMLInputElement;
    confirmButton: HTMLButtonElement;

    constructor() {
        this.authorizationWrapper = AUTHORIZATION__WINDOW.WRAPPER;
        this.authorizationClose = AUTHORIZATION__WINDOW.CLOSE;
        this.authorizationInput = AUTHORIZATION__WINDOW.INPUT;
        this.authorizationButton = AUTHORIZATION__WINDOW.BTN;
        //
        this.confirmWrapper = CONFIRMATION__WINDOW.WRAPPER;
        this.confirmClose = CONFIRMATION__WINDOW.CLOSE;
        this.confirmInput = CONFIRMATION__WINDOW.INPUT;
        this.confirmButton = CONFIRMATION__WINDOW.BTN;
    }

    public init(): void {
        this.listener();
    }

    private listener(): void {
        ChatWidget.exit.addEventListener('click', (): void => this.openAuthorizationWindow(), false);
        this.authorizationClose.addEventListener('click', (): void => {
            this.closeAuthorizationWindow();
            ChatWidget.showWidget();
        }, false);
        this.authorizationInput.addEventListener('keydown', (event): void => {
            if (event.key === 'Enter' && this.authorizationInput.value) {
                this.emailCookiesAndServerRequest(this.authorizationInput.value);
                this.clearAuthorizationInputField();
            }
        }, false);
        this.authorizationButton.addEventListener('click', (event): void => {
            if (this.authorizationInput.value) {
                this.emailCookiesAndServerRequest(this.authorizationInput.value);
                this.clearAuthorizationInputField();
            }
        }, false);
        this.confirmClose.addEventListener('click', () => {
            this.closeConfirmWindow();
            COOKIE.remove('email');
            COOKIE.remove('token');
            COOKIE.remove('name');
        }, false);
        this.confirmInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && this.confirmInput.value) {
                SERVER.userAuthorized(this.confirmInput.value)
                    .then(res => {
                        if (+res.status === 200) {
                            COOKIE.set('token', this.confirmInput.value);
                            this.closeConfirmWindow();
                        }
                    })
                    .catch(error => {
                        this.clearConfirmInputField();
                        alert(error);
                    });
            }
        }, false);
        this.confirmButton.addEventListener('click', (event) => {
            if (this.confirmInput.value) {
                SERVER.userAuthorized(this.confirmInput.value)
                    .then(res => {
                        if (+res.status === 200) {
                            COOKIE.set('token', this.confirmInput.value);
                            this.closeConfirmWindow();
                        }
                    })
                    .catch(error => {
                        this.clearConfirmInputField();
                        alert(error);
                    });
            }
        }, false);
    }

    emailCookiesAndServerRequest(email: string) {
        COOKIE.set('email', email);
        SERVER.emailRequest()
            .then(() => {
                this.clearAuthorizationInputField();
                this.closeAuthorizationWindow();
                this.openConfirmWindow();
            })
            .catch(err => {
                alert(err);
            });
    }

    private openAuthorizationWindow(): void {
        this.authorizationWrapper.style.display = 'flex';
        ChatWidget.hideWidget();
    }

    private openConfirmWindow(): void {
        this.confirmWrapper.style.display = 'flex';
    }

    private closeAuthorizationWindow(): void {
        this.authorizationWrapper.style.display = 'none';
    }

    private closeConfirmWindow(): void {
        this.confirmWrapper.style.display = 'none';
        this.clearConfirmInputField();
        ChatWidget.showWidget();
    }

    private clearAuthorizationInputField(): void {
        this.authorizationInput.value = '';
    }

    private clearConfirmInputField(): void {
        this.confirmInput.value = '';
    }
}