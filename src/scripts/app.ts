import { INPUT } from './input';
import { AUTHORIZATION } from './authorization';
import { SETTINGS_WINDOW } from './settings-window';
import { SERVER } from './server';
import { RENDER } from './render';

const appInput = new INPUT();
const authorization = new AUTHORIZATION();
const settings = new SETTINGS_WINDOW();

export class APP {
    public static run() {
        SERVER.init();
        RENDER.init();
        appInput.init();
        authorization.init();
        settings.init();
    }
}