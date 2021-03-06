const createBookItemTemplate = ({
  id,
  title,
  author,
  year,
  isComplete,
}) => `
<div class="col-md-6 col-lg-4 book-item" data-book_id="${id}">
  <div class="card">
    <div class="row g-0">
      <div
        class="col-4 d-flex align-items-center justify-content-center"
      >
        <i
          class="h1 fw-bold fas fa-book text-secondary"
          aria-label="Illustration"
        ></i>
      </div>
      <div class="col-8">
        <div class="card-body">
          <p class="h5 card-title mb-3 book-title">${title}</p>
          <p class="card-text">Pengarang : <span class="book-author">${author}</span></p>
          <p class="card-text">Tahun : <span class="book-year">${year}</span></p>
        </div>
      </div>
    </div>
    <div
      class="
        card-footer
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <button class="btn btn-success d-flex align-items-center toggle-isComplete">
        <i class="${isComplete ? 'far' : 'fas'} fa-bookmark me-2"></i>
        ${isComplete ? 'Belum selesai' : 'Selesai'}
      </button>
      <button
        class="btn btn-primary d-flex align-items-center edit-btn"
      >
        <i class="far fa-edit me-2"></i>
        Edit
      </button>
    </div>
  </div>
</div>
`;

export default createBookItemTemplate;
