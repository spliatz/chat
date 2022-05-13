import { COOKIE  } from './cookie';
import { RENDER } from './render';


interface Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;
    ws: WebSocket;
}

export class SERVER implements Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;
    ws: WebSocket;

    private static readonly confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
    private static readonly aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
    private static readonly getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
    public static ws = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${COOKIE.get('token')}`);


    constructor() {
        this.ws = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${COOKIE.get('token')}`);
        this.confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
        this.aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
    }

    public static init(): void {
        SERVER.openSocket();
    }

    private static openSocket(): void {
        SERVER.ws = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${COOKIE.get('token')}`);
        SERVER.socketEvents();
    }

    public static loadHistory (): Promise<Response> {
        return fetch(SERVER.getAdress)
            .then(res => res.json())
            .catch(err => alert(err));
    }

    private static socketEvents(): void {
        SERVER.ws.onclose = (e) => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(() => {
                SERVER.openSocket();
            }, 1000);
        };

        this.ws.onerror = (err: any) => {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            SERVER.ws.close();
        };

        SERVER.ws.onmessage = () => {
            SERVER.loadHistory()
                .then(res => RENDER.renderChatStory(res))
        };

    }

    public static sendSocket(value: string): void {
        SERVER.ws.send(JSON.stringify({
            text: `${value}`,
        }));

    }

    public static emailRequest(): Promise<Response>{
        return fetch(SERVER.confirmAdress,
            {
                'headers': {'Content-Type': 'application/json'},
                'method': 'POST',
                body: JSON.stringify({email: `${COOKIE.get('email')}`}),
            });
    }

    public static setName(name: string){
       return SERVER.userAuthorized(`${COOKIE.get('token')}`)
            .then(res => {
                if (+res.status === 200) {
                    COOKIE.set('name', name)
                    SERVER.loadHistory()
                        .then(res => {
                            RENDER.renderChatStory(res);
                        });
                    SERVER.ws.close();
                    return fetch(SERVER.confirmAdress, {
                        headers: {
                            'Authorization': `Bearer ${COOKIE.get('token')}`,
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        method: 'PATCH',
                        body: JSON.stringify({name: `${name}`}),
                    });
                } else {
                    console.log(res);
                    alert('Вы не авторизованы!');
                }
            })
    }

    public static userAuthorized(code: string): Promise<Response> {
        return fetch(SERVER.aboutUserAdress, {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`,
            },
            'method': 'GET',
        });
    }

}