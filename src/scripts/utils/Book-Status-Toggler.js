import Book from '../data/Book';
import Toast from './Toast-Initiator';

const BookStatusToggler = {
  async init({
    bookElements,
  }) {
    const bookElems = document.querySelectorAll(bookElements);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.toggle-isComplete').addEventListener('click', async (event) => {
        event.stopPropagation();

        const bookId = parseInt(bookItem.dataset.book_id, 10);
        const book = Book.getBookById(bookId);

        Book.updateBook(bookId, { isComplete: !book.isComplete });

        window.dispatchEvent(new Event('updatePage'));

        await Toast.fire({
          icon: 'success',
          title: `Buku ${book.isComplete ? 'belum dibaca.' : 'telah dibaca'}`,
        });
      });
    });
  },
};

export default BookStatusToggler;
