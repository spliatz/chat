import { WIDGET_UI, getString, AUTHORIZATION__WINDOW, CONFIRMATION__WINDOW, SETTINGS__WINDOW } from './config';
import messageTemplate from './config';
import Cookies from 'js-cookie';

export default class widget {
    constructor() {
        this.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);
        this.messages = [];
        this.widget = WIDGET_UI.WIDGET;
        this.input = WIDGET_UI.INPUT;
        this.exit = WIDGET_UI.EXIT;
        this.inputBtn = WIDGET_UI.WRITE__BTN;
        this.container = WIDGET_UI.CONTAINER;
        //
        this.settingsOpenBtn = WIDGET_UI.SETTING__BTN
        this.settingsCloseBtn = SETTINGS__WINDOW.CLOSE__BTN
        this.settingsWindow = SETTINGS__WINDOW.WINDOW
        this.settingsInput = SETTINGS__WINDOW.INPUT
        this.settingBtn = SETTINGS__WINDOW.BTN
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
        this.confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
        this.aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
    }

    init() {
        this.loadHistory().then(() => {
            this.eventListener();
            this.preloadCLose();
            if (Cookies.get('token')) {
                this.exit.textContent = 'Выйти';
            }
        });
    }

    preloadCLose() {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function() {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 1000);
    }

    loadHistory() {
        return fetch(this.getAdress).then(res => res.json())
            .then(res => {
                const email = Cookies.get('email');
                this.messages = [];
                for (let i = 0; i < res.messages.length; i++) {
                    let date = new Date(res.messages[i].createdAt);
                    this.messages.push(
                        {
                            text: res.messages[i].text,
                            user: {email: res.messages[i].user.email, name: res.messages[i].user.name},
                            date: date.getHours() + ':' + date.getMinutes(),
                            isMyMessage: email === res.messages[i].user.email,
                        },
                    );
                }
                this.render();
            })
            .catch(err => alert(err));
    }

    eventListener() {
        this.input.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.input.value) {
                this.sendMessage(this.input.value);
                this.input.value = '';
            }
        });

        this.inputBtn.addEventListener('click', (_) => {
            if (this.input.value) {
                this.sendMessage(this.input.value);
                this.input.value = '';
            }
        });

        this.socket.onmessage = (event) => {
            this.loadHistory().then(() => {
                console.log(event);
            });
        };
    }

    sendMessage(value) {
        this.socket.send(JSON.stringify({
            text: `${value}`,
        }));
    }

    render() {
        this.clearMessagesBox();
        const name = Cookies.get('name');
        this.messages.forEach((item) => {
            //
            let message = document.createElement('div');
            message.className = `message  ${item.isMyMessage ? 'my-message' : ''}`;
            //
            const timeElement = document.createElement('div');
            timeElement.textContent = getString(item.date);
            timeElement.className = 'send-time';
            //
            message.append(messageTemplate(
                item.isMyMessage && name ? name :
                    item.user.name ? item.user.name : item.user.email,
                item.text, item.date), timeElement);
            //
            this.container.prepend(message);
            this.container.scrollBy(0, this.container.offsetHeight - this.container.scrollTop);
        });
    }

    clearMessagesBox() {
        this.container.innerHTML = '';
    }
}
