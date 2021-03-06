import Book from '../../data/Book';
import CONFIG from '../../global/CONFIG';
import EditFormInitiator from '../../utils/Edit-Form-Initiator';
import NewBookFormInitiator from '../../utils/New-Book-Form-Initiator';
import BookStatusToggler from '../../utils/Book-Status-Toggler';

import {
  createBookItemTemplate,
  createEmptyListTemplate,
  createListContentTemplate,
} from '../templates';
import UrlParser from '../../routes/url-parser';

const search = {
  async render() {
    return createListContentTemplate();
  },

  async afterRender() {
    const { keyword } = UrlParser.parseActiveUrlWithoutCombiner();

    const titleElement = document.getElementById(CONFIG.PAGE_TITLE_ID);
    titleElement.innerText = `Hasil Cari dari ${keyword}`;

    const mainContent = document.querySelector(CONFIG.LIST_ELEMENT);

    const books = Book.searchBooks(keyword);

    mainContent.innerHTML = '';
    if (books.length > 0) {
      books.forEach((book) => {
        mainContent.innerHTML += createBookItemTemplate(book);
      });
    } else {
      mainContent.innerHTML = createEmptyListTemplate();
    }

    await NewBookFormInitiator.init({
      formId: CONFIG.NEW_BOOK_FORM_ID,
      togglerBtnId: 'new-book-form-toggler',
      BookModel: Book,
    });

    await BookStatusToggler.init({
      bookElements: CONFIG.BOOK_ELEMENTS,
      BookModel: Book,
    });

    await EditFormInitiator.init({
      formId: CONFIG.EDIT_BOOK_FORM_ID,
      booksElements: CONFIG.BOOK_ELEMENTS,
      deleteBtnId: CONFIG.DELETE_BTN_ID,
      BookModel: Book,
    });
  },
};

export default search;
