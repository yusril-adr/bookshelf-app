import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import GoTo from '../routes/Go-To';
import { createEditFormTemplate } from '../views/templates';
import Toast from './Toast-Initiator';

const EditFormInitiator = {
  async init({
    formId,
    booksElements,
    deleteBtnId,
    BookModel,
  }) {
    await this._initAllEditBtns(formId, booksElements, deleteBtnId, BookModel);
  },

  async _initAllEditBtns(formId, elementQuery, deleteBtnId, BookModel) {
    const bookElems = document.querySelectorAll(elementQuery);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.edit-btn').addEventListener('click', async (event) => {
        event.stopPropagation();

        await this._showEditForm(formId, bookItem, BookModel);
        await this._initDeleteBtn(formId, deleteBtnId, BookModel);
      });
    });
  },

  async _showEditForm(formId, element, BookModel) {
    const bookId = element.dataset.book_id;
    const book = BookModel.getBookById(bookId);

    document.getElementById('form-container').innerHTML = '';
    document.getElementById('form-container').innerHTML = createEditFormTemplate({ formId, book });

    const form = document.getElementById(formId);

    const formModal = new Modal(form);
    formModal.show();

    form.addEventListener('hidden.bs.modal', () => formModal.dispose());
    await this._initEditFormSubmitEvent(form, BookModel);
  },

  async _initEditFormSubmitEvent(form, BookModel) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const isComplete = event.target['edit-book-isComplete'].checked;

      const bookId = event.target['edit-book-id'].value;

      const newData = {
        title: event.target['edit-book-title'].value,
        author: event.target['edit-book-author'].value,
        year: event.target['edit-book-year'].value,
        isComplete,
      };

      BookModel.updateBook(bookId, newData);

      const closeBtn = event.target.querySelector('button[data-bs-dismiss=modal]');
      closeBtn.click();

      form.reset();

      const redirectPage = isComplete ? '/' : '/uncompleted-list';
      await GoTo.page(redirectPage);
    });
  },

  async _initDeleteBtn(formId, deleteBtnId, BookModel) {
    const form = document.getElementById(formId);

    const deleteBtn = document.getElementById(deleteBtnId);
    deleteBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const { isConfirmed } = await Swal.fire({
        title: 'Apa kamu yakin ?',
        text: 'Buku yang dihapus tidak akan bisa dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak',
      });

      if (isConfirmed) {
        Swal.showLoading();

        const bookId = document.getElementById('edit-book-id').value;
        BookModel.deleteBook(bookId);

        const closeBtn = form.querySelector('button[data-bs-dismiss=modal]');
        closeBtn.click();

        window.dispatchEvent(new Event('updatePage'));

        await Toast.fire({
          icon: 'success',
          title: 'Buku berhasil dihapus',
        });
      }
    });
  },
};

export default EditFormInitiator;
