import widget from './widget';
import authorization from './authorization';

const widgetApp = new widget();
const authorizationWindow = new authorization();

export default class APP {

    constructor() {
    }

    run() {
        widgetApp.init();
        authorizationWindow.init();
    }
}
