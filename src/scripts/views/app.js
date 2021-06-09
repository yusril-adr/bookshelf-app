import Swal from 'sweetalert2';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import CONFIG from '../global/CONFIG';
import Book from '../data/Book';
import Toast from '../utils/Toast-Initiator';

const App = {
  async initPage() {
    await this._renderPage();
    await this._initSearchForm();
    await this._initLinkPage();
    await this._initNewBookForm();
    await this._initEditBookForm();
  },

  async _renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    await page.init();
    await this._initToggleCompleteStatus();
    await this._initEditFormValue();
  },

  async _initToggleCompleteStatus() {
    const bookElems = document.querySelectorAll(CONFIG.BOOK_ELEMENTS);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.toggle-isComplete').addEventListener('click', async (event) => {
        event.stopPropagation();

        const bookId = parseInt(bookItem.dataset.book_id, 10);
        const book = Book.getBookById(bookId);

        Book.updateBook(bookId, { isComplete: !book.isComplete });

        await this._renderPage();

        await Toast.fire({
          icon: 'success',
          title: `Buku ${book.isComplete ? 'belum dibaca.' : 'telah dibaca'}`,
        });
      });
    });
  },

  async _initEditFormValue() {
    const bookElems = document.querySelectorAll(CONFIG.BOOK_ELEMENTS);

    const editForm = document.getElementById(CONFIG.EDIT_BOOK_FORM_ID);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.edit-btn').addEventListener('click', (event) => {
        event.stopPropagation();

        const bookId = parseInt(bookItem.dataset.book_id, 10);
        const book = Book.getBookById(bookId);

        editForm.querySelector('#edit-book-id').value = book.id;
        editForm.querySelector('#edit-book-title').value = book.title;
        editForm.querySelector('#edit-book-author').value = book.author;
        editForm.querySelector('#edit-book-year').value = book.year;
        editForm.querySelector('#edit-book-isComplete').checked = book.isComplete;
      });
    });
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

        const target = event.target.href;
        window.history.pushState(
          {},
          target.split('/').splice(3).join('/'),
          target,
        );

        await this._renderPage();
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

  async _initEditBookForm() {
    const form = document.getElementById(CONFIG.EDIT_BOOK_FORM_ID);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const isComplete = event.target['edit-book-isComplete'].checked;

      const bookId = parseInt(event.target['edit-book-id'].value, 10);

      const newData = {
        title: event.target['edit-book-title'].value,
        author: event.target['edit-book-author'].value,
        year: event.target['edit-book-year'].value,
        isComplete,
      };

      Book.updateBook(bookId, newData);

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

    await this._initDeleteBtn();
  },

  async _initDeleteBtn() {
    const form = document.getElementById(CONFIG.EDIT_BOOK_FORM_ID);

    const deleteBtn = document.getElementById(CONFIG.DELETE_BTN_ID);
    deleteBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const { isConfirmed } = await Swal.fire({
        title: 'Apa kamu yakin ?',
        text: 'Buku yang dihapus tidak akan bisa dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak',
      });

      if (isConfirmed) {
        Swal.showLoading();

        const bookId = parseInt(document.getElementById('edit-book-id').value, 10);
        Book.deleteBook(bookId);

        const closeBtn = form.querySelector('button[data-bs-dismiss=modal]');
        closeBtn.click();

        await this._renderPage();

        await Toast.fire({
          icon: 'success',
          title: 'Buku berhasil dihapus',
        });
      }
    });
  },
};

export default App;
