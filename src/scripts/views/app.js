import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import LinkInitiator from '../utils/Link-Initiator';
import HeaderInitiator from '../utils/Header-Initiator';

class App {
  constructor({
    header,
    content,
  }) {
    this._header = header;
    this._content = content;

    this._initAppShell();
  }

  async _initAppShell() {
    await HeaderInitiator.init(this._header);

    await LinkInitiator.init();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
