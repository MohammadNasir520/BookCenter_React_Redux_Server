import { Request, Response } from 'express';
import { BookService } from './book.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const getAllBooks = await BookService.getAllBooks();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: getAllBooks,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const getAllBooks = await BookService.getSingleBook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: getAllBooks,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedDAta = req.body;
  const updatedBook = await BookService.updateBook(id, updatedDAta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: updatedBook,
  });
});

const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteSingleBook = await BookService.deleteSingleBook(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Book deleted successfully',
    data: deleteSingleBook,
  });
});

export const BookController = {
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  updateBook,
};
