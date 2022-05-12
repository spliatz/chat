import { COOKIE  } from './cookie';


interface Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;
    socket: WebSocket;
}

export class SERVER implements Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;
    socket: WebSocket;

    private static readonly confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
    private static readonly aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';


    constructor() {
        this.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${COOKIE.get('token')}`);
        this.confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
        this.aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
    }

    public socketListener(): void {
        this.socket.onmessage = () => {

        };
    }

    public sendSocket(value: string): void {
        this.socket.send(JSON.stringify({
            text: `${value}`,
        }));

    }

    loadHistory () {
        return fetch(this.getAdress).then(res => res.json())
            .catch(err => alert(err));
    }

    public static emailRequest() {
        return fetch(SERVER.confirmAdress,
            {
                'headers': {'Content-Type': 'application/json'},
                'method': 'POST',
                body: JSON.stringify({email: `${COOKIE.get('email')}`}),
            });
    }

    public static userAuthorized(code: string) {
        return fetch(SERVER.aboutUserAdress, {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`,
            },
            'method': 'GET',
        });
    }

    public setName(name: string) {
        return fetch(this.confirmAdress, {
            headers: {
                'Authorization': `Bearer ${COOKIE.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'PATCH',
            body: JSON.stringify({name: `${name}`}),
        });
    }
}