import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import Book from '../data/Book';
import GoTo from '../routes/Go-To';
import { createEditFormTemplate } from '../views/templates';
import Toast from './Toast-Initiator';

const EditFormInitiator = {
  async init({
    formId,
    booksElements,
    deleteBtnId,
  }) {
    await this._initAllEditBtns(formId, booksElements, deleteBtnId);
  },

  async _initAllEditBtns(formId, elementQuery, deleteBtnId) {
    const bookElems = document.querySelectorAll(elementQuery);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.edit-btn').addEventListener('click', async (event) => {
        event.stopPropagation();

        await this._showEditForm(formId, bookItem);
        await this._initDeleteBtn(formId, deleteBtnId);
      });
    });
  },

  async _showEditForm(formId, element) {
    const bookId = parseInt(element.dataset.book_id, 10);
    const book = Book.getBookById(bookId);

    document.getElementById('form-container').innerHTML = '';
    document.getElementById('form-container').innerHTML = createEditFormTemplate({ formId, book });

    const form = document.getElementById(formId);

    const formModal = new Modal(form);
    formModal.show();

    form.addEventListener('hidden.bs.modal', () => formModal.dispose());
    await this._initEditFormSubmitEvent(form);
  },

  async _initEditFormSubmitEvent(form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const isComplete = event.target['edit-book-isComplete'].checked;

      const bookId = parseInt(event.target['edit-book-id'].value, 10);

      const newData = {
        title: event.target['edit-book-title'].value,
        author: event.target['edit-book-author'].value,
        year: event.target['edit-book-year'].value,
        isComplete,
      };

      Book.updateBook(bookId, newData);

      const closeBtn = event.target.querySelector('button[data-bs-dismiss=modal]');
      closeBtn.click();

      form.reset();

      const redirectPage = isComplete ? '/' : '/uncompleted-list';
      await GoTo.page(redirectPage);
    });
  },

  async _initDeleteBtn(formId, deleteBtnId) {
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

        const bookId = parseInt(document.getElementById('edit-book-id').value, 10);
        Book.deleteBook(bookId);

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
