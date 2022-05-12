import { PRELOAD } from './preload';
import { INPUT } from './input';
import { AUTHORIZATION } from './authorization';

const preload = new PRELOAD();
const appInput = new INPUT();
const authorization = new AUTHORIZATION();

export class APP {
   public static run() {
        preload.close();
        appInput.init();
        authorization.init();
    }
}