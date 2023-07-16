import { IBook } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (BookData: IBook): Promise<IBook> => {
  const createBook = await Book.create(BookData);
  return createBook;
};

const getAllBooks = async () => {
  const getAllBooks = await Book.find({});
  return getAllBooks;
};
const getSingleBook = async (id: string) => {
  const getAllBooks = await Book.findById(id);
  return getAllBooks;
};
const deleteSingleBook = async (id: string) => {
  const deleteSingleBook = await Book.findByIdAndDelete(id);
  if (!deleteSingleBook) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Book already deleted or not exist'
    );
  }

  return deleteSingleBook;
};
const updateBook = async (id: string, payload: Partial<IBook>) => {
  const updatedBook = await Book.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );
  return updatedBook;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  updateBook,
};
