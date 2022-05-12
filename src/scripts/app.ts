import { INPUT } from './input';
import { SERVER } from './server';
import { COOKIE } from './cookie';

const cookies = new COOKIE();
const server = new SERVER();
const appInput = new INPUT();

export class APP {
    run() {
        appInput.init();
    }
}