import { Modal } from 'bootstrap';
import Book from '../data/Book';
import GoTo from '../routes/Go-To';
import { createNewBookFormTemplate } from '../views/templates';

const NewBookFormInitiator = {
  async init({
    formId,
    togglerBtnId,
  }) {
    const togglerBtn = document.getElementById(togglerBtnId);

    togglerBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      document.getElementById('form-container').innerHTML = '';
      document.getElementById('form-container').innerHTML = createNewBookFormTemplate(formId);

      const form = document.getElementById(formId);

      const formModal = new Modal(form);
      formModal.show();

      form.addEventListener('hidden.bs.modal', () => formModal.dispose());
      await this._initFormSubmitEvent(form, formModal);
    });
  },

  async _initFormSubmitEvent(form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isComplete = event.target['new-book-isComplete'].checked;

      const newBook = {
        title: event.target['new-book-title'].value,
        author: event.target['new-book-author'].value,
        year: event.target['new-book-year'].value,
        isComplete,
      };

      Book.createBook(newBook);

      const closeBtn = event.target.querySelector('button[data-bs-dismiss=modal]');
      closeBtn.click();

      form.reset();

      const redirectPage = isComplete ? '/' : '/uncompleted-list';
      await GoTo.page(redirectPage);
    });
  },
};

export default NewBookFormInitiator;
