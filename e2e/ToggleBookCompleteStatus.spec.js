const assert = require('assert');

Feature('Toggle Books Status');

const newBook = {
  title: 'Test title',
  author: 'Test author',
  year: `${new Date().getFullYear() - 1}`,
};

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('#new-book-form-toggler');

  I.click('#new-book-form-toggler');

  I.waitForClickable('#new-book-title');

  I.fillField('#new-book-title', newBook.title);
  I.fillField('#new-book-author', newBook.author);
  I.fillField('#new-book-year', newBook.year);
});

Scenario('should be able toggle completed to uncompleted', async ({ I }) => {
  I.checkOption('#new-book-isComplete');

  I.click('#new-book-modal button[type=submit]');

  I.seeNumberOfElements('.book-item', 1);

  I.waitForClickable('.book-item .toggle-isComplete');
  I.click('.book-item .toggle-isComplete');
  newBook.isComplete = false;

  I.amOnPage('/uncompleted-list');

  const showedBook = {
    title: await I.grabTextFrom('.book-item .book-title'),
    author: await I.grabTextFrom('.book-item .book-author'),
    year: await I.grabTextFrom('.book-item .book-year'),
    isComplete: await I.grabTextFrom('.book-item .toggle-isComplete') === 'Belum selesai',
  };

  I.seeNumberOfElements('.book-item', 1);

  assert.deepStrictEqual(newBook, showedBook);
});

Scenario('should be able toggle uncompleted to completed', async ({ I }) => {
  I.click('#new-book-modal button[type=submit]');

  I.seeNumberOfElements('.book-item', 1);

  I.waitForClickable('.book-item .toggle-isComplete');
  I.click('.book-item .toggle-isComplete');
  newBook.isComplete = true;

  I.amOnPage('/');

  const showedBook = {
    title: await I.grabTextFrom('.book-item .book-title'),
    author: await I.grabTextFrom('.book-item .book-author'),
    year: await I.grabTextFrom('.book-item .book-year'),
    isComplete: await I.grabTextFrom('.book-item .toggle-isComplete') === 'Belum selesai',
  };

  I.seeNumberOfElements('.book-item', 1);

  assert.deepStrictEqual(newBook, showedBook);
});
