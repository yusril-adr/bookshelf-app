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
    togglerBtn.dispatchEvent(new Event('click'));

    expect(document.getElementById(FORM_ID))
      .toBeTruthy();
  });

  it('should hide the form modal when the submit event triggered', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.dispatchEvent(new Event('click'));

    const titleInput = document.getElementById('new-book-title');
    titleInput.value = 'Test Title';

    const authorInput = document.getElementById('new-book-author');
    authorInput.value = 'Test Author';

    const yearInput = document.getElementById('new-book-year');
    yearInput.value = new Date().getFullYear();

    const isCompleteCheckBox = document.getElementById('new-book-isComplete');
    isCompleteCheckBox.checked = true;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.dispatchEvent(new Event('click'));

    // Waiting for the close animation first
    setTimeout(() => {
      expect(document.getElementById(FORM_ID))
        .toBeFalsy();
    }, 500);
  });

  it('should create a new Book when the submit button is pressed with valid input', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.dispatchEvent(new Event('click'));

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

    const isCompleteCheckBox = document.getElementById('new-book-isComplete');
    isCompleteCheckBox.checked = testBookData.isComplete;

    const submitBtn = document.querySelector('button[type=submit]');
    submitBtn.dispatchEvent(new Event('click'));

    // Waiting for the close animation first
    setTimeout(() => {
      expect(Book.getCompletedBooks())
        .toHaveSize(1);

      const [{ id: bookId }] = Book.getCompletedBooks()[0];

      expect(Book.getBookById(bookId))
        .toEqual({
          id: bookId,
          ...testBookData,
        });
    }, 500);
  });

  it('should not create a new Book when the submit button is pressed without valid input', async () => {
    await TestFactories.createNewBookFormPresenter({
      togglerBtnId: TOGGLER_BTN_ID,
      formId: FORM_ID,
    });

    const togglerBtn = document.getElementById(TOGGLER_BTN_ID);
    togglerBtn.dispatchEvent(new Event('click'));

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
    submitBtn.dispatchEvent(new Event('click'));

    // Waiting for the close animation first
    setTimeout(() => {
      expect(Book.getCompletedBooks())
        .toHaveSize(0);
    }, 500);
  });
});
