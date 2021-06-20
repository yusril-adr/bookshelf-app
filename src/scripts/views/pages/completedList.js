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

const completedList = {
  async render() {
    return createListContentTemplate();
  },

  async afterRender() {
    const titleElement = document.getElementById(CONFIG.PAGE_TITLE_ID);
    titleElement.innerText = 'Selesai Dibaca';

    const mainContent = document.querySelector(CONFIG.LIST_ELEMENT);

    const books = Book.getCompletedBooks();

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

export default completedList;
