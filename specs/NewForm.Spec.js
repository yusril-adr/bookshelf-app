import * as TestFactories from './helpers/testFactories';
import Book from '../src/scripts/data/Book';

describe('Adding a new book', () => {
  const TOGGLER_BTN_ID = 'add-button';
  const FORM_ID = 'new-book-form';

  const addFormContainer = () => {
    document.body.innerHTML = '<div id="form-container"></div>';
  };

  const addFormTogglerButton = () => {
    document.body.innerHTML += `<button id="${TOGGLER_BTN_ID}"></button>`;
  };

  beforeEach(() => {
    addFormContainer();
    addFormTogglerButton();
  });

  afterEach(() => {
    Book.deleteAllBooks();
  });

  it('should show the form modal when the add button is pressed', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.click();

    expect(document.getElementById(FORM_ID))
      .toBeTruthy();
  });

  it('should create a new Book when the submit button is pressed with valid input', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.click();

    const testBookData = {
      title: 'Test Title',
      author: 'Test Author',
      year: new Date().getFullYear().toString(),
      isComplete: true,
    };

    const titleInput = document.getElementById('new-book-title');
    titleInput.value = testBookData.title;

    const authorInput = document.getElementById('new-book-author');
    authorInput.value = testBookData.author;

    const yearInput = document.getElementById('new-book-year');
    yearInput.value = testBookData.year;

    const isCompleteCheckBox = document.getElementById('new-book-isComplete');
    isCompleteCheckBox.checked = testBookData.isComplete;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.click();

    expect(Book.getCompletedBooks())
      .toHaveSize(1);

    const [{ id: bookId }] = Book.getCompletedBooks();

    expect(Book.getBookById(bookId))
      .toEqual({
        id: bookId,
        ...testBookData,
      });
  });

  it('should not create a new Book when the submit button is pressed witht invalid input', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.click();

    const testBookData = {
      title: 'Test Title',
      author: 'Test Author',
      year: new Date().getFullYear(),
      isComplete: true,
    };

    const titleInput = document.getElementById('new-book-title');
    titleInput.value = testBookData.title;

    const authorInput = document.getElementById('new-book-author');
    authorInput.value = testBookData.author;

    const yearInput = document.getElementById('new-book-year');
    yearInput.value = testBookData.year;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.click();

    expect(Book.getCompletedBooks())
      .toHaveSize(0);
  });
});
