import { createMessage, WIDGET_UI as widget } from './config';
import { SERVER } from './server';
import { getString } from './config';
import { COOKIE } from './cookie';
import { PRELOAD } from './preload';

export class RENDER {

    public static init() {
        SERVER.loadHistory()
            .then(res => RENDER.renderChatStory(res))
            .then(() => {
                PRELOAD.close();
            });
        SERVER.userAuthorized(`${COOKIE.get('token')}`)
            .then(res => {
                if (+res.status === 200) {
                    RENDER.renderAuthorizationButton(true);
                } else {
                    RENDER.renderAuthorizationButton(false);
                }
            });
    }

    public static renderChatStory(response: any) {
        RENDER.renderEmptyChat();
        response.messages.reverse().forEach((item: any, index: number) => {
            if (index < 200) {
                widget.CONTAINER.append(createMessage(item));
                widget.CONTAINER.scrollBy(0, widget.CONTAINER.offsetHeight - widget.CONTAINER.scrollTop);
            }
        });
    }

    public static renderNewMessage(data: any) {
        widget.CONTAINER.prepend(createMessage(data));
        widget.CONTAINER.scrollBy(0, widget.CONTAINER.offsetHeight - widget.CONTAINER.scrollTop);
    }

    private static renderEmptyChat() {
        widget.CONTAINER.innerHTML = '';
    }

    public static renderAuthorizationButton(isAuthorized: boolean) {
        widget.EXIT.textContent = isAuthorized ? 'Выйти' : 'Войти';
    }
}