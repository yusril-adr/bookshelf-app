const assert = require('assert');

Feature('Delete Books');

const addBookScenario = async (I) => {
  I.amOnPage('/');

  I.seeElement('#new-book-form-toggler');

  I.click('#new-book-form-toggler');

  I.waitForClickable('#new-book-title');

  const newBook = {
    title: 'Test title',
    author: 'Test author',
    year: `${new Date().getFullYear() - 1}`,
    isComplete: true,
  };

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
};

Before(async ({ I }) => {
  await addBookScenario(I);
});

Scenario('should be able to delete book if confirmed', async ({ I }) => {
  I.waitForClickable('.book-item .edit-btn');
  I.click('.book-item .edit-btn');

  I.waitForClickable('#delete-btn');
  I.click('#delete-btn');

  I.waitForClickable('button.swal2-confirm');
  I.click('button.swal2-confirm');

  I.dontSeeElement('.book-item');
});

Scenario('should not be able to delete book if canceled', async ({ I }) => {
  I.waitForClickable('.book-item .edit-btn');
  I.click('.book-item .edit-btn');

  I.waitForClickable('#delete-btn');
  I.click('#delete-btn');

  I.waitForClickable('button.swal2-cancel');
  I.click('button.swal2-cancel');

  I.seeNumberOfElements('.book-item', 1);
});
