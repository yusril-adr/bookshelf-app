import Toast from '../utils/Toast-Initiator';

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

        await this._renderPage();

        await Toast.fire({
          icon: 'success',
          title: `Buku ${book.isComplete ? 'belum dibaca.' : 'telah dibaca'}`,
        });
      });
    });
  }
};

export default BookStatusToggler;
