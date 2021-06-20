import Toast from './Toast-Initiator';

const BookStatusToggler = {
  async init({
    bookElements,
    BookModel,
  }) {
    const bookElems = document.querySelectorAll(bookElements);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.toggle-isComplete').addEventListener('click', async (event) => {
        event.stopPropagation();

        const bookId = bookItem.dataset.book_id;
        const book = BookModel.getBookById(bookId);

        BookModel.updateBook(bookId, { isComplete: !book.isComplete });

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
