const createListContentTemplate = () => `
  <h1 class="text-center" id="page-title"></h1>
  <hr />

  <div class="row" id="book-list"></div>

  <button
    id="new-book-form-toggler"
    class="btn btn-success btn-float"
    aria-label="Tambah Buku baru"
  >
    <i class="fas fa-plus"></i>
  </button>

  <div id="form-container"></div>
`;

export default createListContentTemplate;
