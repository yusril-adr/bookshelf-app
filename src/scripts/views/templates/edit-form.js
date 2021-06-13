const createEditFormTemplate = ({
  formId, book,
}) => `
  <form
    class="modal fade"
    id="${formId}"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Edit Buku</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="tutup"
          ></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="edit-book-id" value="${book.id}" />
          <div class="mb-3">
            <label for="edit-book-title" class="form-label">Judul Buku</label>
            <input
              type="text"
              class="form-control"
              id="edit-book-title"
              placeholder="Judul"
              autocomplete="off"
              value="${book.title}"
              required
            />
          </div>

          <div class="mb-3">
            <label for="edit-book-author" class="form-label"
              >Pengarang Buku</label
            >
            <input
              type="text"
              class="form-control"
              id="edit-book-author"
              placeholder="Nama Pengarang"
              autocomplete="off"
              value="${book.author}"
              required
            />
          </div>

          <div class="mb-3">
            <label for="edit-book-year" class="form-label"
              >Tahun Terbit</label
            >
            <input
              type="number"
              class="form-control"
              id="edit-book-year"
              placeholder="Tahun Terbit"
              autocomplete="off"
              value="${book.year}"
              required
            />
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="edit-book-isComplete"
              ${book.isComplete ? 'checked' : ''}
            />
            <label class="form-check-label" for="edit-book-isComplete">
              Selesai Dibaca
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" id="delete-btn">Hapus</button>
          <button type="submit" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  </form>
`;

export default createEditFormTemplate;
