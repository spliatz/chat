import { SERVER } from './server';
import { ChatWidget } from './chat-widget';
import { SETTINGS__WINDOW } from './config';

interface settings {
    wrapper: HTMLDivElement;
    closeButton: HTMLButtonElement;
    button: HTMLButtonElement;
    input: HTMLInputElement;
}

export class SETTINGS_WINDOW implements settings {
    wrapper: HTMLDivElement;
    closeButton: HTMLButtonElement;
    button: HTMLButtonElement;
    input: HTMLInputElement;

    constructor() {
        this.wrapper = SETTINGS__WINDOW.WINDOW;
        this.closeButton = SETTINGS__WINDOW.CLOSE__BTN;
        this.button = SETTINGS__WINDOW.BTN;
        this.input = SETTINGS__WINDOW.INPUT;
    }

    public init(): void {
        this.listener();
    }

    private listener(): void {
        ChatWidget.settingBtn.addEventListener('click', (): void => {
            ChatWidget.hideWidget();
            this.openWindow();
        }, false);
        this.closeButton.addEventListener('click', (): void => {
            this.clearInputField();
            this.closeWindow();
            ChatWidget.showWidget();
        }, false);
        this.input.addEventListener('keydown', (event): void => {
            if (event.key === 'Enter') {
                SERVER.setName(this.input.value)
                    .then(() => {
                        this.clearInputField();
                        this.closeWindow();
                        ChatWidget.showWidget();
                    });
            }
        }, false);
    }

    private openWindow(): void {
        this.wrapper.style.display = 'flex';
    }

    private closeWindow(): void {
        this.wrapper.style.display = 'none';
    }

    private clearInputField(): void {
        this.input.value = '';
    }
}