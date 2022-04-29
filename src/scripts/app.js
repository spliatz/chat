import settingsWindow from './settings-window';
import writeMessage from './writeMessage';
import authorization from './authorization';

const sendMessage = new writeMessage();
const settingsModalWindow = new settingsWindow();
const authorizationWindow = new authorization();

export default class APP {

    constructor() {
    }

    run() {
        sendMessage.init();
        settingsModalWindow.init();
        authorizationWindow.init();
    }

}