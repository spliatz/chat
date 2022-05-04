import widget from './widget';
import { authorization } from './authorization';
import { settingsWindow } from './settings-window';

const widgetApp = new widget();
const authorizationWindow = new authorization();
const settings = new settingsWindow();

export default class APP {
    run() {
        widgetApp.init();
        authorizationWindow.init();
        settings.init();
    }
}
