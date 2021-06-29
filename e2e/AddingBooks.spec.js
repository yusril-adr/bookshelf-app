const assert = require('assert');

Feature('Adding Books');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('#new-book-form-toggler');
});

Scenario('should be able create a new book', async ({ I }) => {
  I.click('#new-book-form-toggler');

  const newBook = {
    title: 'Test title',
    // author: 'Test author',
    year: `${new Date().getFullYear() - 1}`,
    isComplete: true,
  };

  I.waitForClickable('#new-book-title');

  I.fillField('#new-book-title', newBook.title);
  I.fillField('#new-book-author', newBook.author);
  I.fillField('#new-book-year', newBook.year);
  if (newBook.isComplete) I.checkOption('#new-book-isComplete');

  I.click('#new-book-modal button[type=submit]');

  I.seeNumberOfElements('.book-item', 1);

  const showedBook = {
    title: await I.grabTextFrom('.book-item .book-title'),
    author: await I.grabTextFrom('.book-item .book-author'),
    year: await I.grabTextFrom('.book-item .book-year'),
    isComplete: await I.grabTextFrom('.book-item .toggle-isComplete') === 'Belum selesai',
  };

  assert.deepStrictEqual(newBook, showedBook);
});

Scenario('should not be able create a new book without complete input', async ({ I }) => {
  I.click('#new-book-form-toggler');

  const newBook = {
    title: 'Test title',
    year: `${new Date().getFullYear() - 1}`,
    isComplete: true,
  };

  I.waitForClickable('#new-book-title');

  I.fillField('#new-book-title', newBook.title);
  I.fillField('#new-book-year', newBook.year);
  if (newBook.isComplete) I.checkOption('#new-book-isComplete');

  I.click('#new-book-modal button[type=submit]');

  I.seeElement('#new-book-modal');

  I.dontSeeElement('.book-item');
});
