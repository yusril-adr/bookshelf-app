import Book from '../src/scripts/data/Book';
import itActAsBookModel from './contracts/BookModel.Contract';

describe('Book Model Test Implementation', () => {
  itActAsBookModel(Book);
});
