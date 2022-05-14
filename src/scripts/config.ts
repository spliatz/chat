export const WIDGET_UI = {
    WIDGET: document.getElementById('widget') as HTMLDivElement,
    SETTING__BTN: document.getElementById('setting-btn') as HTMLButtonElement,
    INPUT: document.getElementById('write__input') as HTMLInputElement,
    WRITE__BTN: document.getElementById('write__btn') as HTMLButtonElement,
    CONTAINER: document.getElementById('message-container') as HTMLDivElement,
    EXIT: document.getElementById('exit-btn') as HTMLButtonElement,
};

export const SETTINGS__WINDOW = {
    WINDOW: document.getElementById('setting-window') as HTMLDivElement,
    CLOSE__BTN: document.getElementById('setting-window__close') as HTMLButtonElement,
    INPUT: document.getElementById('settings-input') as HTMLInputElement,
    BTN: document.getElementById('settings-btn') as HTMLButtonElement,
};

export const AUTHORIZATION__WINDOW = {
    WRAPPER: document.getElementById('authorization') as HTMLDivElement,
    CLOSE: document.getElementById('authorization-close') as HTMLButtonElement,
    INPUT: document.getElementById('email-input') as HTMLInputElement,
    BTN: document.getElementById('email-btn') as HTMLButtonElement,
};

export const CONFIRMATION__WINDOW = {
    WRAPPER: document.getElementById('confirmation') as HTMLDivElement,
    CLOSE: document.getElementById('confirmation-close') as HTMLButtonElement,
    INPUT: document.getElementById('code-input') as HTMLInputElement,
    BTN: document.getElementById('code-btn') as HTMLButtonElement,
};

export default function messageTemplate(user: string, message: string) {
    const messageInner = document.createElement('div');
    messageInner.className = 'message-inner';
    const userName = document.createElement('div');
    const text = document.createElement('div');
    text.textContent = message;
    userName.textContent = user + ':';
    userName.className = 'userNoSelect';
    messageInner.append(userName, text);
    return (messageInner);
}

export function getString(number: string) {
    if (number.split(':')[1].length < 2) return number.split(':')[0] + ':' + '0' + number.split(':')[1];
    return number;
}
