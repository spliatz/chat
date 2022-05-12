import { COOKIE as Cookie } from './cookie';
import { promises } from 'dns';

const Cookies = new Cookie();

interface Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;
}

export class SERVER implements Iserver {
    confirmAdress: string;
    getAdress: string;
    aboutUserAdress: string;

    constructor() {
        this.confirmAdress = 'https://mighty-cove-31255.herokuapp.com/api/user';
        this.getAdress = 'https://mighty-cove-31255.herokuapp.com/api/messages';
        this.aboutUserAdress = 'https://mighty-cove-31255.herokuapp.com/api/user/me';
    }

    public emailRequest() {
        return fetch(this.confirmAdress,
            {
                'headers': {'Content-Type': 'application/json'},
                'method': 'POST',
                body: JSON.stringify({email: `${Cookies.get('email')}`}),
            });
    }

    public userAuthorized(code: string) {
        return fetch(this.aboutUserAdress, {
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
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'PATCH',
            body: JSON.stringify({name: `${name}`}),
        });
    }
}