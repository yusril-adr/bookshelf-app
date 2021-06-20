import Book from '../../src/scripts/data/Book';
import NewBookFormInitiator from '../../src/scripts/utils/New-Book-Form-Initiator';
import BookStatusToggler from '../../src/scripts/utils/Book-Status-Toggler';

const createNewBookFormPresenter = async ({ formId, togglerBtnId }) => {
  await NewBookFormInitiator.init({
    formId,
    togglerBtnId,
    BookModel: Book,
  });
};

const createBookStatusTogglerPresenter = async (bookElements) => {
  await BookStatusToggler.init({
    bookElements,
    BookModel: Book,
  });
};

export {
  createNewBookFormPresenter,
  createBookStatusTogglerPresenter,
};
