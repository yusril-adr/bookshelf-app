import Book from '../../src/scripts/data/Book';
import NewBookFormInitiator from '../../src/scripts/utils/New-Book-Form-Initiator';

const createNewBookFormPresenter = async ({ formId, togglerBtnId }) => {
  await NewBookFormInitiator.init({
    formId,
    togglerBtnId,
    BookModel: Book,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createNewBookFormPresenter,
};
