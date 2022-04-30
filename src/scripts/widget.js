import settingsWindow from './settings-window';
import authorization from './authorization';
import { WIDGET_UI } from './config';
import messageTemplate from './config';
import Cookies from 'js-cookie';

const settingsModalWindow = new settingsWindow();
const authorizationWindow = new authorization();

export default class widget {
    constructor() {
        this.mesagges =  [];
        this.input = WIDGET_UI.INPUT;
        this.inputBtn = WIDGET_UI.WRITE__BTN;
        this.container = WIDGET_UI.CONTAINER;
        this.user = 'Я';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
    }

    init() {
        this.loadHistory().then(() => {
            this.eventListener();
            settingsModalWindow.init();
            authorizationWindow.init();
        });

    }

    loadHistory() {
        return fetch(this.getAdress).then(res => res.json()).then(res => {
            for (let i = 0; i < 10; i++) {
                let date = new Date(res.messages[i].createdAt);
                this.sendMessage(res.messages[i].text,
                    res.messages[i].user.name ? res.messages[i].user.name : res.messages[i].user.email,
                    date.getHours() + ':' + date.getMinutes(), false);
                this.render();
            }
        });
    }

    eventListener() {
        this.input.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.input.value) {
                let date = new Date();
                this.sendMessage(this.input.value, Cookies.get('name') || this.user, date.toLocaleTimeString(), true);
                this.render();
                this.input.value = '';
            }
        });
        this.inputBtn.addEventListener('click', (_) => {
            if (this.input.value) {
                let date = new Date();
                this.sendMessage(this.input.value, Cookies.get('name') || this.user, date.toLocaleTimeString(), true);
                this.render();
                this.input.value = '';
            }

        });
    }

    sendMessage(value, user, date, isMyMessage) {
        this.mesagges.push({
            text: value,
            user: {email: '', name: user},
            date: date,
            isMyMessage: isMyMessage,
        });
    }

    render() {
        this.clearMessagesBox();
        this.mesagges.forEach((item) => {
            let message = document.createElement('div');
            message.className = `message  ${item.isMyMessage ? 'my-message' : ''}`;
            message.innerHTML = messageTemplate(
                item.isMyMessage && Cookies.get('name') ? Cookies.get('name') :
                item.user.name ? item.user.name : item.user.email,
                item.text,
                item.date);
            this.container.prepend(message);
            this.container.scrollBy(0, this.container.offsetHeight - this.container.scrollTop);
        });
    }

    clearMessagesBox() {
        this.container.innerHTML = '';
    }
}
