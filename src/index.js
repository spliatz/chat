'use strict';
import './styles/index.scss';
import APP from './scripts/app';

document.addEventListener("DOMContentLoaded", () => {
   const app = new APP();
    app.run();
});

