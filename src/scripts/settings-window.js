import Cookies from 'js-cookie';
import widget from './widget';

export class settingsWindow extends widget {

    init() {
        this.eventListener();
    }

    eventListener() {
        this.settingsInput.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.settingsInput.value) {
                this.setName(this.settingsInput.value);
                this.settingsInput.value = '';
                this.closeWindow();
            }
        });

        this.settingBtn.addEventListener('click', () => {
            if (this.settingsInput.value) {
                this.setName(this.settingsInput.value);
                this.settingsInput.value = '';
                this.closeWindow();
            }
        });

        this.settingsOpenBtn.addEventListener('click', () => {
            this.showWindow();
        });

        this.settingsCloseBtn.addEventListener('click', () => {
            this.closeWindow();
            this.settingsInput.value = '';
        });
    }

    setName(name) {
        fetch('https://mighty-cove-31255.herokuapp.com/api/user', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'PATCH',
            body: JSON.stringify({name: `${name}`}),
        }).then(res => {
            if (res.status === 200) {
                Cookies.set('name', name);
                super.loadHistory();
                super.render();
            } else {
                this.renderError();
            }
        });
    }

    showWindow() {
        this.settingsWindow.style.display = 'flex';
        this.widget.style.display = 'none';
    }

    closeWindow() {
        this.settingsWindow.style.display = 'none';
        this.widget.style.display = 'flex';
    }

    renderError() {
        this.settingsInput.value = '';
        this.settingsInput.style.background = '#f29e8c';
        setTimeout(() => this.settingsInput.style.background = '', 1000);
    }
}
