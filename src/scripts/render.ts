import { WIDGET_UI as widget } from './config';
import messageTemplate from './config';
import { SERVER } from './server';
import { getString } from './config';
import { COOKIE } from './cookie';

export class RENDER {

    public static init() {
        SERVER.loadHistory()
            .then(res => RENDER.renderChatStory(res));
        SERVER.userAuthorized(`${COOKIE.get('token')}`)
            .then(res => {
                if (+res.status === 200) {
                    RENDER.renderAuthorizationButton(true);
                } else {
                    RENDER.renderAuthorizationButton(false);
                }
            })
    }

    public static renderChatStory(response: any) {
        RENDER.renderEmptyChat();
        response.messages.reverse().forEach((item: any, index: number) => {
            if (index < 200) {
                const date = new Date(item.createdAt);
                const time = date.getHours() + ':' + date.getMinutes();
                const isMyUser = COOKIE.get('email') === item.user.email;
                //
                const message = document.createElement('div');
                message.className = `message  ${isMyUser ? 'my-message' : ''}`;
                //
                const timeElement = document.createElement('div');
                timeElement.textContent = getString(time);
                timeElement.className = 'send-time';
                //
                message.append(messageTemplate(
                        (isMyUser && COOKIE.get('name') ? COOKIE.get('name') : item.user.name || item.user.email), item.text),
                    timeElement);
                //
                widget.CONTAINER.append(message);
                widget.CONTAINER.scrollBy(0, widget.CONTAINER.offsetHeight - widget.CONTAINER.scrollTop);
            }
        });
    }

    private static renderEmptyChat() {
        widget.CONTAINER.innerHTML = '';
    }

    public static renderAuthorizationButton(isAuthorized: boolean) {
        widget.EXIT.textContent = isAuthorized ? 'Выйти' : 'Войти';
    }
}