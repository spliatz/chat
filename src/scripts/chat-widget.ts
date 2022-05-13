import { WIDGET_UI } from './config';

interface widget {
    widget: HTMLDivElement;
    messagesContainer: HTMLDivElement;
    settingsBtn: HTMLButtonElement;
    exit: HTMLButtonElement;
}

export class ChatWidget implements widget {
    widget: HTMLDivElement;
    messagesContainer: HTMLDivElement;
    settingsBtn: HTMLButtonElement;
    exit: HTMLButtonElement;

    static messageContainer: HTMLDivElement;
    static settingBtn =  WIDGET_UI.SETTING__BTN;
    static exit = WIDGET_UI.EXIT;
    static widget = WIDGET_UI.WIDGET;


    constructor() {
        this.widget = WIDGET_UI.WIDGET;
        this.messagesContainer = WIDGET_UI.CONTAINER;
        this.settingsBtn = WIDGET_UI.SETTING__BTN;
        this.exit = WIDGET_UI.EXIT;
    }

    public static hideWidget(): void {
        ChatWidget.widget.style.visibility = 'hidden';
    }

    public static showWidget(): void {
        ChatWidget.widget.style.visibility = 'visible';
    }
}