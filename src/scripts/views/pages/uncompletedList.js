import Book from '../../data/Book';
import CONFIG from '../../global/CONFIG';
import {
  createBookItemTemplate,
  createEmptyListTemplate,
} from '../templates';

const completedList = {
  async init() {
    const titleElement = document.getElementById(CONFIG.PAGE_TITLE_ID);
    titleElement.innerText = 'Belum Selesai Dibaca';

    const mainContent = document.querySelector(CONFIG.LIST_ELEMENT);

    const books = Book.getUnCompletedBook();

    mainContent.innerHTML = '';
    if (books.length > 0) {
      books.forEach((book) => {
        mainContent.innerHTML += createBookItemTemplate(book);
      });
    } else {
      mainContent.innerHTML = createEmptyListTemplate();
    }
  },
};

export default completedList;
