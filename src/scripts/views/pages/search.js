import Book from '../../data/Book';
import CONFIG from '../../global/CONFIG';
import UrlParser from '../../routes/url-parser';
import {
  createBookItemTemplate,
  createEmptyResultTemplate,
} from '../templates';

const search = {
  async init() {
    const { keyword } = UrlParser.parseActiveUrlWithoutCombiner();

    const titleElement = document.getElementById(CONFIG.PAGE_TITLE_ID);
    titleElement.innerText = `Hasil pencarian dari ${keyword}`;

    const mainContent = document.querySelector(CONFIG.LIST_ELEMENT);

    const books = Book.searchBooks(keyword);

    mainContent.innerHTML = '';
    if (books.length > 0) {
      books.forEach((book) => {
        mainContent.innerHTML += createBookItemTemplate(book);
      });
    } else {
      mainContent.innerHTML = createEmptyResultTemplate();
    }
  },
};

export default search;
