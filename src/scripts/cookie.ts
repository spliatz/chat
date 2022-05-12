import Cookies from 'js-cookie';

export class COOKIE {

    public set(token: string, value: string): void {
        Cookies.set(token, value);
    }

    public get(token: string): string | undefined {
        return Cookies.get(token);
    }

    public remove(token: string): void {
        Cookies.remove(token);
    }
}