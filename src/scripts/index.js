import 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';

import App from './views/app';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

window.addEventListener('load', async () => {
  app.renderPage();
});

window.addEventListener('popstate', async () => {
  app.renderPage();
});

window.addEventListener('updatePage', async () => {
  app.renderPage();
});
