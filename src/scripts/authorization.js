import Cookies from 'js-cookie';
import widget from './widget';

export class authorization extends widget {
    init() {
        this.eventListener();
    }

    eventListener() {
        this.exit.addEventListener('click', () => {
            if (!Cookies.get('token')) {
                this.showAuthorizationWindow();
                this.closeWidget();
            } else {
                Cookies.remove('token');
                Cookies.remove('email');
                Cookies.remove('name');
                this.exit.textContent = 'Войти';
            }
        });

        this.closeAuthorization.addEventListener('click', () => {
            this.closeAuthorizationWindow();
            this.showWidget();
        });

        this.emailInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (this.emailInput.value.length > 4 && this.emailInput.value.includes('@')
                    && this.emailInput.value.includes('.')) {
                    this.requestAuthorization().then(() => {
                        this.setEmail(this.emailInput.value);
                        this.showConfirmWindow();
                        this.closeAuthorizationWindow();
                    })

                } else {
                    this.emailInput.value = '';
                    this.emailInput.style.background = '#f29e8c';
                    setTimeout(() => this.emailInput.style.background = '', 1000);
                }
            }
        });

        this.emailBtn.addEventListener('click', () => {
            if (this.emailInput.value.length > 4 && this.emailInput.value.includes('@')
                && this.emailInput.value.includes('.')) {
                this.setEmail(this.emailInput.value);
                this.requestAuthorization();
                this.showConfirmWindow();
                this.closeAuthorizationWindow();
            } else {
                this.emailInput.value = '';
                this.emailInput.style.background = '#f29e8c';
                setTimeout(() => this.emailInput.style.background = '', 1000);
            }
        });

        this.codeInput.addEventListener('keydown', event => {
            if (event.key === 'Enter' && this.codeInput) {
                this.codeRequest(this.codeInput.value);
                this.codeInput.value = '';
                this.exit.textContent = 'Выйти';
                this.closeConfirmWindow();
                this.showWidget();
            }
        });

        this.codeBtn.addEventListener('click', () => {
            if (this.codeInput) {
                this.codeRequest(this.codeInput.value);
                this.codeInput.value = '';
                this.exit.textContent = 'Выйти';
                this.closeConfirmWindow();
                this.showWidget();
            }
        });

        this.confirmClose.addEventListener('click', () => {
            this.closeConfirmWindow();
            this.showWidget();
        });
    }

    requestAuthorization() {
        return fetch(this.confirmAdress,
            {
                'headers': {'Content-Type': 'application/json'},
                'method': 'POST',
                body: JSON.stringify({email: `${this.email}`}),
            });
    }

    setEmail(email) {
        this.email = email;
        Cookies.set('email', this.email);
    }

    codeRequest(code) {
        fetch(this.aboutUserAdress, {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`,
            },
            'method': 'GET',
        })
            .then(res => {
                if (res.status === 200) {
                    Cookies.set('token', code);
                } else {
                    Cookies.remove('token');
                    Cookies.remove('email');
                    Cookies.remove('name');
                    this.exit.textContent = 'Войти';
                    alert('неверный токен или почта');
                }
            });
    }

    showWidget() {
        this.widget.style.display = 'flex';
    }

    closeWidget() {
        this.widget.style.display = 'none';
    }

    showAuthorizationWindow() {
        this.authorizationBlock.style.display = 'flex';
    }

    showConfirmWindow() {
        this.confirmWrapper.style.display = 'flex';
    }

    closeAuthorizationWindow() {
        this.authorizationBlock.style.display = 'none';
        this.emailInput.value = '';
    }

    closeConfirmWindow() {
        this.confirmWrapper.style.display = 'none';
        this.codeInput.value = '';
    }
}
