import CONFIG from '../global/CONFIG';
import GoTo from '../routes/Go-To';

const HeaderInitiator = {
  async init(headerElem) {
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
