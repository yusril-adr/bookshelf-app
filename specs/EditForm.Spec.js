import * as TestFactories from './helpers/testFactories';
import { createBookItemTemplate } from '../src/scripts/views/templates';
import Book from '../src/scripts/data/Book';

describe('Edit a book', () => {
  const FORM_ID = 'edit-book-form';
  const EDIT_BTN_ELEMENT = '.edit-btn';

  const addBookElements = (books) => {
    books.forEach((book) => {
      document.body.innerHTML += createBookItemTemplate(book);
    });
  };

  const addFormContainer = () => {
    document.body.innerHTML = '<div id="form-container"></div>';
  };

  beforeEach(() => {
    addFormContainer();
  });

  afterEach(() => {
    Book.deleteAllBooks();
  });

  it('should show the form modal when the edit button is pressed', async () => {
    Book.createBook({ title: 'Book Title', isComplete: true });

    const books = Book.getCompletedBooks();

    addBookElements(books);

    await TestFactories.createEditFormInitiatorPresenter({
      formId: FORM_ID,
    });

    const editBtn = document.querySelector(EDIT_BTN_ELEMENT);
    editBtn.click();

    expect(document.getElementById(FORM_ID))
      .toBeTruthy();
  });

  it('should update a Book when the submit button is pressed with valid input', async () => {
    const oldBookData = {
      title: 'Old Title',
      author: 'Old Author',
      year: new Date().getFullYear() - 1,
      isComplete: true,
    };

    const bookId = Book.createBook(oldBookData);

    const books = Book.getCompletedBooks();

    addBookElements(books);

    await TestFactories.createEditFormInitiatorPresenter({
      formId: FORM_ID,
    });

    const editBtn = document.querySelector(EDIT_BTN_ELEMENT);
    editBtn.click();

    const updatedBookData = {
      title: 'Test Title',
      author: 'Test Author',
      year: new Date().getFullYear().toString(),
      isComplete: false,
    };

    const titleInput = document.getElementById('edit-book-title');
    titleInput.value = updatedBookData.title;

    const authorInput = document.getElementById('edit-book-author');
    authorInput.value = updatedBookData.author;

    const yearInput = document.getElementById('edit-book-year');
    yearInput.value = updatedBookData.year;

    const isCompleteCheckBox = document.getElementById('edit-book-isComplete');
    isCompleteCheckBox.checked = updatedBookData.isComplete;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.click();

    expect(Book.getCompletedBooks())
      .toHaveSize(0);

    expect(Book.getBookById(bookId))
      .toEqual({
        id: bookId,
        ...updatedBookData,
      });
  });

  it('should not update a Book when the submit button is pressed with invalid input', async () => {
    const oldBookData = {
      title: 'Old Title',
      author: 'Old Author',
      year: (new Date().getFullYear() - 1).toString(),
      isComplete: true,
    };

    const bookId = Book.createBook(oldBookData);

    const books = Book.getCompletedBooks();

    addBookElements(books);

    await TestFactories.createEditFormInitiatorPresenter({
      formId: FORM_ID,
    });

    const editBtn = document.querySelector(EDIT_BTN_ELEMENT);
    editBtn.click();

    const updatedBookData = {
      year: new Date().getFullYear(),
      isComplete: false,
    };

    const titleInput = document.getElementById('edit-book-title');
    titleInput.value = '';

    const authorInput = document.getElementById('edit-book-author');
    authorInput.value = '';

    const yearInput = document.getElementById('edit-book-year');
    yearInput.value = updatedBookData.year;

    const isCompleteCheckBox = document.getElementById('edit-book-isComplete');
    isCompleteCheckBox.checked = updatedBookData.isComplete;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.click();

    expect(Book.getCompletedBooks())
      .toHaveSize(1);

    expect(Book.getBookById(bookId))
      .toEqual({ id: bookId, ...oldBookData });
  });
});
