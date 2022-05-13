import { WIDGET_UI, SETTINGS__WINDOW } from './config';
import { SETTINGS_WINDOW } from './settings-window';

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

    //public static widget: HTMLDivElement;
    static messageContainer: HTMLDivElement;
    static settingBtn =  WIDGET_UI.SETTING__BTN;
    //public static exit: HTMLButtonElement;
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