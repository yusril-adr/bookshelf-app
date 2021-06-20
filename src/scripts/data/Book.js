import { nanoid } from 'nanoid';
import CONFIG from '../global/CONFIG';

const Book = {
  createBook(newBook) {
    const books = this._getAllBooks();

    const id = nanoid();
    const updatedBooks = [
      { id, ...newBook },
      ...books,
    ];
    this._updateBooks(updatedBooks);

    return id;
  },

  _getAllBooks() {
    const books = JSON.parse(window.localStorage.getItem(CONFIG.BOOK_KEY)) || [];
    return books;
  },

  _updateBooks(newBooks) {
    const newBooksJSON = JSON.stringify(newBooks);
    window.localStorage.setItem(CONFIG.BOOK_KEY, newBooksJSON);
  },

  getCompletedBooks() {
    const books = this._getAllBooks();

    return books.filter(({ isComplete }) => isComplete);
  },

  getUnCompletedBooks() {
    const books = this._getAllBooks();

    return books.filter(({ isComplete }) => !isComplete);
  },

  getBookById(id) {
    const books = this._getAllBooks();

    return books.find((book) => book.id === id);
  },

  searchBooks(keyword) {
    const books = this._getAllBooks();

    const searchResult = books.filter(({ title }) => (
      title.toLowerCase().includes(keyword.toLowerCase())
    ));

    return searchResult;
  },

  updateBook(id, newData) {
    const books = this._getAllBooks();

    const bookIndex = books.findIndex((book) => book.id === id);
    const oldData = this.getBookById(id);
    books[bookIndex] = {
      ...oldData,
      ...newData,
    };

    this._updateBooks(books);
  },

  deleteBook(id) {
    const books = this._getAllBooks();

    const updatedBooks = books.filter((book) => book.id !== id);

    this._updateBooks(updatedBooks);
  },

  deleteAllBooks() {
    window.localStorage.removeItem(CONFIG.BOOK_KEY);
  },
};

export default Book;
