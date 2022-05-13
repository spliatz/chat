

export  const WIDGET_UI = {
    WIDGET: <HTMLDivElement>document.getElementById('widget'),
    SETTING__BTN: <HTMLButtonElement>document.getElementById('setting-btn'),
    INPUT: <HTMLInputElement>document.getElementById('write__input'),
    WRITE__BTN: <HTMLButtonElement>document.getElementById('write__btn'),
    CONTAINER: <HTMLDivElement>document.getElementById('message-container'),
    EXIT: <HTMLButtonElement>document.getElementById('exit-btn'),
};

export const SETTINGS__WINDOW = {
    WINDOW: <HTMLDivElement>document.getElementById('setting-window'),
    CLOSE__BTN: <HTMLButtonElement>document.getElementById('setting-window__close'),
    INPUT: <HTMLInputElement>document.getElementById('settings-input'),
    BTN: <HTMLButtonElement>document.getElementById('settings-btn'),
};

export const AUTHORIZATION__WINDOW = {
    WRAPPER: <HTMLDivElement>document.getElementById('authorization'),
    CLOSE: <HTMLButtonElement>document.getElementById('authorization-close'),
    INPUT: <HTMLInputElement>document.getElementById('email-input'),
    BTN: <HTMLButtonElement>document.getElementById('email-btn'),
};

export const CONFIRMATION__WINDOW = {
    WRAPPER: <HTMLDivElement>document.getElementById('confirmation'),
    CLOSE: <HTMLButtonElement>document.getElementById('confirmation-close'),
    INPUT: <HTMLInputElement>document.getElementById('code-input'),
    BTN: <HTMLButtonElement> document.getElementById('code-btn'),
};

export default function messageTemplate(user: string, message: string) {
    const messageInner = document.createElement('div');
    messageInner.className = 'message-inner'
    const userName = document.createElement('div');
    const text = document.createElement('div');
    text.textContent = message;
    userName.textContent = user+':';
    userName.className = 'userNoSelect';
    messageInner.append(userName, text)
    return (messageInner);
}

export function getString(number: string) {
    if (number.split(':')[1].length < 2) return number.split(':')[0] + ':' + '0' + number.split(':')[1];
    return number;
}
