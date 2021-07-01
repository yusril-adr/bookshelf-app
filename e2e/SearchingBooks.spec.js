const assert = require('assert');

Feature('Delete Books');

const addBookScenario = async (I, bookTitle = 'Test title') => {
  I.amOnPage('/');

  I.seeElement('#new-book-form-toggler');

  I.click('#new-book-form-toggler');

  I.waitForClickable('#new-book-title');

  const newBook = {
    title: bookTitle,
    author: 'Test author',
    year: `${new Date().getFullYear() - 1}`,
    isComplete: true,
  };

  I.fillField('#new-book-title', newBook.title);
  I.fillField('#new-book-author', newBook.author);
  I.fillField('#new-book-year', newBook.year);
  if (newBook.isComplete) I.checkOption('#new-book-isComplete');

  I.click('#new-book-modal button[type=submit]');
};

Before(async ({ I }) => {
  await addBookScenario(I, 'Title 1');
  await addBookScenario(I, 'Title 2');
});

Scenario('should be able to show the result that contains inputted keyword', async ({ I }) => {
  I.fillField('#search-keyword', 'Title');

  I.waitForClickable('#search-form button[type=submit]');
  I.click('#search-form button[type=submit]');

  I.seeInCurrentUrl('/search/Title');

  I.seeNumberOfElements('.book-item', 2);

  const firstResultTitle = await I.grabTextFrom(locate('.book-title').at(1));
  const secondResultTitle = await I.grabTextFrom(locate('.book-title').at(2));

  assert.strictEqual('Title 1', secondResultTitle);
  assert.strictEqual('Title 2', firstResultTitle);
});

Scenario('should not be able to show the result that does\'nt match inputted keyword', async ({ I }) => {
  I.seeElement('#search-form');

  I.fillField('#search-keyword', '3');

  I.waitForClickable('#search-form button[type=submit]');
  I.click('#search-form button[type=submit]');

  I.seeInCurrentUrl('/search/3');

  I.dontSeeElement('.book-item');

  I.see('List Kosong', 'h2.h3');
});
