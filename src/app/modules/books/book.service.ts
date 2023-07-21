import { IBook } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (BookData: IBook): Promise<IBook> => {
  const createBook = await Book.create(BookData);
  return createBook;
};

const getAllBooks = async (filters: { searchTerm?: string }) => {
  const { searchTerm } = filters;
  console.log(filters);

  const academicSemesterSearchableFields = ['title', 'year'];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         author: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  // const whereCondition =
  //   andConditions.length > 0 ? { $and: andConditions } : {};
  // console.log(whereCondition);

  const getAllBooks = await Book.find(whereCondition);
  console.log(getAllBooks);
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
