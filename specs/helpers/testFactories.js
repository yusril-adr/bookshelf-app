import CONFIG from '../../src/scripts/global/CONFIG';
import Book from '../../src/scripts/data/Book';
import NewBookFormInitiator from '../../src/scripts/utils/New-Book-Form-Initiator';
import BookStatusToggler from '../../src/scripts/utils/Book-Status-Toggler';
import EditFormInitiator from '../../src/scripts/utils/Edit-Form-Initiator';

const createNewBookFormPresenter = async ({ formId, togglerBtnId }) => {
  await NewBookFormInitiator.init({
    formId,
    togglerBtnId,
    BookModel: Book,
  });
};

const createBookStatusTogglerPresenter = async () => {
  await BookStatusToggler.init({
    bookElements: CONFIG.BOOK_ELEMENTS,
    BookModel: Book,
  });
};

const createEditFormInitiatorPresenter = async ({ formId }) => {
  await EditFormInitiator.init({
    formId,
    booksElements: CONFIG.BOOK_ELEMENTS,
    deleteBtnId: CONFIG.DELETE_BTN_ID,
    BookModel: Book,
  });
};

export {
  createNewBookFormPresenter,
  createBookStatusTogglerPresenter,
  createEditFormInitiatorPresenter,
};
