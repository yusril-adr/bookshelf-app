import * as TestFactories from './helpers/testFactories';
import Book from '../src/scripts/data/Book';
import { createBookItemTemplate } from '../src/scripts/views/templates';
import CONFIG from '../src/scripts/global/CONFIG';

describe('Toggle book isComplete status', () => {
  const addBookElements = (books) => {
    document.body.innerHTML = '';

    books.forEach((book) => {
      document.body.innerHTML += createBookItemTemplate(book);
    });
  };

  afterEach(() => {
    Book.deleteAllBooks();
  });

  it('should show text "Belum selesai" when the book is already completed', async () => {
    Book.createBook({ isComplete: true });
    const books = Book.getCompletedBooks();

    expect(books).toHaveSize(1);

    addBookElements(books);

    await TestFactories.createBookStatusTogglerPresenter(CONFIG.BOOK_ELEMENTS);

    const toggleBtn = document.querySelector('.toggle-isComplete');

    expect(toggleBtn.innerText)
      .toEqual('Belum selesai');
  });

  it('should show text "Selesai" when the book is not completed yet', async () => {
    Book.createBook({ isComplete: false });
    const books = Book.getUnCompletedBooks();

    expect(books).toHaveSize(1);

    addBookElements(books);

    await TestFactories.createBookStatusTogglerPresenter(CONFIG.BOOK_ELEMENTS);

    const toggleBtn = document.querySelector('.toggle-isComplete');

    expect(toggleBtn.innerText)
      .toEqual('Selesai');
  });

  it('should update isComplete status to false when the book is already completed', async () => {
    const bookId = Book.createBook({ isComplete: true });
    const books = Book.getCompletedBooks();

    expect(books).toHaveSize(1);

    addBookElements(books);

    await TestFactories.createBookStatusTogglerPresenter(CONFIG.BOOK_ELEMENTS);

    const toggleBtn = document.querySelector('.toggle-isComplete');
    toggleBtn.dispatchEvent(new Event('click'));

    expect(Book.getBookById(bookId))
      .toEqual({ id: bookId, isComplete: false });
  });

  it('should update isComplete status to true when the book is not completed yet', async () => {
    const bookId = Book.createBook({ isComplete: false });
    const books = Book.getUnCompletedBooks();

    expect(books).toHaveSize(1);

    addBookElements(books);

    await TestFactories.createBookStatusTogglerPresenter(CONFIG.BOOK_ELEMENTS);

    const toggleBtn = document.querySelector('.toggle-isComplete');
    toggleBtn.dispatchEvent(new Event('click'));

    expect(Book.getBookById(bookId))
      .toEqual({ id: bookId, isComplete: true });
  });
});
