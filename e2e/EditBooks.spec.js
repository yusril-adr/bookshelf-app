const assert = require('assert');

Feature('Edit Books');

const newBook = {
  title: 'Test title',
  author: 'Test author',
  year: `${new Date().getFullYear() - 1}`,
  isComplete: true,
};

const updateData = {
  title: 'Updated Title',
  author: 'Updated Author',
  year: `${new Date().getFullYear()}`,
  isComplete: false,
};

const addBookScenario = async (I) => {
  I.amOnPage('/');

  I.seeElement('#new-book-form-toggler');

  I.click('#new-book-form-toggler');

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
};

Before(async ({ I }) => {
  await addBookScenario(I);
});

Scenario('should be able to update book with new data', async ({ I }) => {
  I.waitForClickable('.book-item .edit-btn');
  I.click('.book-item .edit-btn');

  I.waitForClickable('#edit-book-title');

  I.fillField('#edit-book-title', updateData.title);
  I.fillField('#edit-book-author', updateData.author);
  I.fillField('#edit-book-year', updateData.year);

  if (updateData.isComplete) {
    I.checkOption('#edit-book-isComplete');
  } else {
    I.uncheckOption('#edit-book-isComplete');
  }

  I.click('#edit-book-modal button[type=submit]');

  I.seeNumberOfElements('.book-item', 1);

  const showedBook = {
    title: await I.grabTextFrom('.book-item .book-title'),
    author: await I.grabTextFrom('.book-item .book-author'),
    year: await I.grabTextFrom('.book-item .book-year'),
    isComplete: await I.grabTextFrom('.book-item .toggle-isComplete') === 'Belum selesai',
  };

  assert.notDeepStrictEqual(newBook, showedBook);
});

Scenario('should not be able to update book without complete input', async ({ I }) => {
  I.waitForClickable('.book-item .edit-btn');
  I.click('.book-item .edit-btn');

  I.waitForClickable('#edit-book-title');

  I.clearField('#edit-book-title');
  I.fillField('#edit-book-author', updateData.author);
  I.fillField('#edit-book-year', updateData.year);

  if (updateData.isComplete) {
    I.checkOption('#edit-book-isComplete');
  } else {
    I.uncheckOption('#edit-book-isComplete');
  }

  I.click('#edit-book-modal button[type=submit]');

  I.seeElement('#edit-book-modal');

  I.dontSeeInCurrentUrl('/uncompleted-list');
});
