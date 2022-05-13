import { PRELOAD } from './preload';
import { INPUT } from './input';
import { AUTHORIZATION } from './authorization';
import {SETTINGS_WINDOW} from './settings-window';

const preload = new PRELOAD();
const appInput = new INPUT();
const authorization = new AUTHORIZATION();
const settings = new SETTINGS_WINDOW();

export class APP {
   public static run() {
        preload.close();
        appInput.init();
        authorization.init();
        settings.init();
    }
}