'use strict';

export const WIDGET_UI = {
    WIDGET: document.getElementById('widget'),
    SETTING__BTN: document.getElementById('setting-btn'),
    INPUT: document.getElementById('write__input'),
    WRITE__BTN: document.getElementById('write__btn'),
    CONTAINER: document.getElementById('message-container'),
    EXIT: document.getElementById('exit-btn'),
};

export const SETTINGS__WINDOW = {
    WINDOW: document.getElementById('setting-window'),
    CLOSE__BTN: document.getElementById('setting-window__close'),
    INPUT: document.getElementById('settings-input'),
    BTN: document.getElementById('settings-btn'),
};

export const AUTHORIZATION__WINDOW = {
    WRAPPER: document.getElementById('authorization'),
    CLOSE: document.getElementById('authorization-close'),
    INPUT: document.getElementById('email-input'),
    BTN: document.getElementById('email-btn'),
};

export const USERS = {
    USER__DEFAULT: 'Я',
    SECOND__USER: 'Собеседник мой',
};

export const CONFIRMATION__WINDOW = {
    WRAPPER: document.getElementById('confirmation'),
    CLOSE: document.getElementById('confirmation-close'),
    INPUT: document.getElementById('code-input'),
    BTN: document.getElementById('code-btn'),
};

export default function messageTemplate(user, message, time) {
    const messageInner = document.createElement('div');
    messageInner.className = 'message-inner'
    const userName = document.createElement('div');
    const text = document.createElement('div');
    text.textContent = message;
    userName.textContent = user+':';
    userName.className = 'userNoSelect';
    messageInner.append(userName, text)
    return (messageInner);

    // return `
    //     <div class="message-inner">
    //         <div class="userNoSelect">${user}:</div>
    //         <div>${message+''}</div>
    //     </div>
    //     <div class="send-time">${getString(time)}</div>
    // `;
}

export function getString(number) {
    if (number.split(':')[1].length < 2) return number.split(':')[0] + ':' + '0' + number.split(':')[1];
    return number;
}

const obj = {
    '_id': '6270d7737f84e300160f67ef',
    'text': 'а он говорит "это родимые пятна"',
    'user': {'email': 'spliatzoff@gmail.com', 'name': 'lena'},
    'createdAt': '2022-05-03T07:19:15.426Z',
    'updatedAt': '2022-05-03T07:19:15.426Z',
    '__v': 0,
};

