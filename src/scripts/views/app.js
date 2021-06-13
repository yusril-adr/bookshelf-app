import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import CONFIG from '../global/CONFIG';
import Book from '../data/Book';
import FormInitiator from '../utils/Form-Initiator';
import BookStatusToggler from '../utils/Book-Status-Toggler';
import GoTo from '../routes/Go-To';

const App = {
  async init() {
    await this._renderPage();
    await this._initSearchForm();
    await this._initLinkPage();
    await this._initNewBookForm();
    await BookStatusToggler.init({
      bookElements: CONFIG.BOOK_ELEMENTS,
    });

    await FormInitiator.initEditForm({
      formId: CONFIG.EDIT_BOOK_FORM_ID,
      booksElements: CONFIG.BOOK_ELEMENTS,
      deleteBtnId: CONFIG.DELETE_BTN_ID,
    });
  },

  async _renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    await page.init();
  },

  async _initSearchForm() {
    const form = document.getElementById(CONFIG.SEARCH_FORM_ID);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const keyword = event.target['search-keyword'].value;
      window.history.pushState(
        {},
        `/search/${keyword}`,
        `${window.location.origin}/search/${keyword}`,
      );

      form.reset();

      await this._renderPage();
    });
  },

  async _initLinkPage() {
    const elements = document.querySelectorAll(CONFIG.LINK_PAGE_ELEMENTS);

    elements.forEach((anchor) => {
      anchor.addEventListener('click', async (event) => {
        event.preventDefault();

        const urlLink = event.target.href;
        await GoTo.url(urlLink);
      });
    });
  },

  async _initNewBookForm() {
    const form = document.getElementById(CONFIG.NEW_BOOK_FORM_ID);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const isComplete = event.target['new-book-isComplete'].checked;

      const newBook = {
        title: event.target['new-book-title'].value,
        author: event.target['new-book-author'].value,
        year: event.target['new-book-year'].value,
        isComplete,
      };

      Book.createBook(newBook);

      const closeBtn = event.target.querySelector('button[data-bs-dismiss=modal]');
      closeBtn.click();

      form.reset();

      window.history.pushState(
        {},
        `${isComplete ? '/' : '/uncompleted-list'}`,
        `${window.location.origin}${isComplete ? '/' : '/uncompleted-list'}`,
      );

      await this._renderPage();
    });
  },
};

export default App;
