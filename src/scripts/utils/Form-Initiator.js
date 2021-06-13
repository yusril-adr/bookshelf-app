import Swal from 'sweetalert2';
import Book from '../data/Book';
import GoTo from '../routes/Go-To';
import Toast from '../utils/Toast-Initiator';

const FormInitiator = {
  async initEditForm({
    formId,
    booksElements,
    deleteBtnId,
  }) {
    await this._autoUpdateValueFromElement(formId, booksElements);

    await this._initEditFormSubmitEvent(formId);
    await this._initDeleteBtn(formId, deleteBtnId);
  },

  async _autoUpdateValueFromElement(formId, elementQuery) {
    const bookElems = document.querySelectorAll(elementQuery);

    bookElems.forEach((bookItem) => {
      bookItem.querySelector('.edit-btn').addEventListener('click', async (event) => {
        event.stopPropagation();

        await this._updateFormValueFrom(formId, bookItem);
      });
    });
  },

  async _updateFormValueFrom(formId ,element) {
    const bookId = parseInt(element.dataset.book_id, 10);
    const book = Book.getBookById(bookId);

    const editForm = document.getElementById(formId);

    editForm.querySelector('#edit-book-id').value = book.id;
    editForm.querySelector('#edit-book-title').value = book.title;
    editForm.querySelector('#edit-book-author').value = book.author;
    editForm.querySelector('#edit-book-year').value = book.year;
    editForm.querySelector('#edit-book-isComplete').checked = book.isComplete;
  },

  async _initEditFormSubmitEvent(formId) {
    const form = document.getElementById(formId);

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

      const pagePath = isComplete ? '/' : '/uncompleted-list';
      await GoTo.page(pagePath);
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

        await this._renderPage();

        await Toast.fire({
          icon: 'success',
          title: 'Buku berhasil dihapus',
        });
      }
    });
  },
};

export default FormInitiator;
