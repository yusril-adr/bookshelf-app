const createNewBookFormTemplate = (formId) => `
  <form
    class="modal fade"
    id="${formId}"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Tambah Buku Baru</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="tutup"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="new-book-title" class="form-label">Judul Buku</label>
            <input
              type="text"
              class="form-control"
              id="new-book-title"
              placeholder="Judul"
              autocomplete="off"
              required
            />
          </div>

          <div class="mb-3">
            <label for="new-book-author" class="form-label"
              >Pengarang Buku</label
            >
            <input
              type="text"
              class="form-control"
              id="new-book-author"
              placeholder="Nama Pengarang"
              autocomplete="off"
              required
            />
          </div>

          <div class="mb-3">
            <label for="new-book-year" class="form-label">Tahun Terbit</label>
            <input
              type="number"
              class="form-control"
              id="new-book-year"
              placeholder="Tahun Terbit"
              autocomplete="off"
              required
            />
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="new-book-isComplete"
            />
            <label class="form-check-label" for="new-book-isComplete">
              Selesai Dibaca
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  </form>
`;

export default createNewBookFormTemplate;
