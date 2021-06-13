import { Collapse } from 'bootstrap';
import CONFIG from '../global/CONFIG';
import GoTo from '../routes/Go-To';

const HeaderInitiator = {
  async init(headerElem) {
    const menuToggle = document.getElementById('navbarSupportedContent');
    const bsCollapse = new Collapse(menuToggle, {
      toggle: false,
    });

    headerElem.querySelectorAll('a').forEach((elem) => {
      elem.addEventListener('click', () => bsCollapse.hide());
    });

    headerElem.querySelectorAll('button').forEach((elem) => {
      elem.addEventListener('click', () => bsCollapse.hide());
    });

    await this._initSearchFormSubmitEvent(headerElem);
  },

  async _initSearchFormSubmitEvent(headerElem) {
    const form = headerElem.querySelector(`#${CONFIG.SEARCH_FORM_ID}`);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const keyword = event.target['search-keyword'].value;

      form.reset();

      const redirectPage = `/search/${keyword}`;
      await GoTo.page(redirectPage);
    });
  },
};

export default HeaderInitiator;
