import Cookies from 'js-cookie';

export class COOKIE {

    public static set(token: string, value: string): void {
        Cookies.set(token, value);
    }

    public static get(token: string): string | undefined {
        return Cookies.get(token);
    }

    public static remove(token: string): void {
        Cookies.remove(token);
    }
}