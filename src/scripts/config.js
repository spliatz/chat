export const WIDGET_UI = {
    WIDGET: document.getElementById('widget'),
    SETTING__BTN: document.getElementById('setting-btn'),
    INPUT: document.getElementById('write__input'),
    WRITE__BTN: document.getElementById('write__btn'),
    CONTAINER: document.getElementById('message-container'),
    EXIT: document.getElementById('exit-btn')
}

export const USERS = {
    USER__DEFAULT: "Я",
    SECOND__USER: "Собеседник мой",
}

export const SETTINGS__WINDOW = {
    WINDOW: document.getElementById('setting-window'),
    CLOSE__BTN: document.getElementById('setting-window__close'),
}

export default function messageTemplate(user,message,time) {
    time = time.split(':');

    return `
    <div class="message my-message">
        <div class="message-inner">${user}: ${message}</div>
        <div class="send-time">${time[0]}:${time[1]}</div>
    </div>
    `
}