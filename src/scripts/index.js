import 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/style.scss';

import App from './views/app';

window.addEventListener('load', async () => {
  App.initPage();
});

window.addEventListener('popstate', async () => {
  App.initPage();
});
