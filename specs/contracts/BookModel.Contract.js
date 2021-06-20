const itActAsBookModel = (model) => {
  afterEach(() => {
    model.deleteAllBooks();
  });

  it('should return the book that has been added', () => {
    const firstBookId = model.createBook({ title: 'First Title' });
    expect(model.getBookById(firstBookId))
      .toEqual({ id: firstBookId, title: 'First Title' });

    const secondBookId = model.createBook({ title: 'Second Title' });
    expect(model.getBookById(secondBookId))
      .toEqual({ id: secondBookId, title: 'Second Title' });

    expect(model.getBookById(+new Date()))
      .toBeUndefined();
  });

  it('should return all of completed books that has been added', () => {
    const firstBookId = model.createBook({ title: 'First Title', isComplete: true });
    const secondBookId = model.createBook({ title: 'Second Title', isComplete: true });
    model.createBook({ title: 'Third Title', isComplete: false });

    const expectedBooks = [
      { id: secondBookId, title: 'Second Title', isComplete: true },
      { id: firstBookId, title: 'First Title', isComplete: true },
    ];

    expect(model.getCompletedBooks())
      .toEqual(expectedBooks);
  });

  it('should return all of uncompleted books that has been added', () => {
    const firstBookId = model.createBook({ title: 'First Title', isComplete: false });
    const secondBookId = model.createBook({ title: 'Second Title', isComplete: false });
    model.createBook({ title: 'Third Title', isComplete: true });

    const expectedBooks = [
      { id: secondBookId, title: 'Second Title', isComplete: false },
      { id: firstBookId, title: 'First Title', isComplete: false },
    ];

    expect(model.getUnCompletedBooks())
      .toEqual(expectedBooks);
  });

  it('should return all of books that have a title that contains any keyword from search', () => {
    const firstBookId = model.createBook({ title: 'First Title with keyword' });
    const secondBookId = model.createBook({ title: 'Second Title with keyword' });
    model.createBook({ title: 'Normal Title' });

    const expectedBookResults = [
      { id: secondBookId, title: 'Second Title with keyword' },
      { id: firstBookId, title: 'First Title with keyword' },
    ];

    expect(model.searchBooks('keyword'))
      .toEqual(expectedBookResults);
  });

  it('should return update book that has been updated', () => {
    const oldData = {
      title: 'Book Title',
      isComplete: false,
    };

    const bookId = model.createBook(oldData);

    const updatedData = {
      title: 'updated title',
      isComplete: true,
    };

    model.updateBook(bookId, updatedData);

    expect(model.getBookById(bookId))
      .not.toEqual(oldData);

    expect(model.getBookById(bookId))
      .toEqual({ id: bookId, ...updatedData });
  });

  it('should remove book that need to be deleted', () => {
    const deletedBookId = model.createBook({ title: 'Deleted Book' });

    model.deleteBook(deletedBookId);

    expect(model.getBookById(deletedBookId))
      .toBeUndefined();
  });
};

export default itActAsBookModel;
