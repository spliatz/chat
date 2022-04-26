'use strict'
import './styles/index.scss';
import settingsWindow from './scripts/settings-window';
import writeMessage from './scripts/writeMessage'
const settingsModalWindow = new settingsWindow();
const sendMessage = new writeMessage();
settingsModalWindow.init();
sendMessage.init();