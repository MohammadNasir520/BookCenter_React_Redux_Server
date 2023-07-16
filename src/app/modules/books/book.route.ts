import express from 'express';
import { BookController } from './book.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { bookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(bookValidation.createBookZodSchema),
  BookController.createBook
);
router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);
router.delete('/:id', BookController.deleteSingleBook);
router.patch('/:id', BookController.updateBook);

export const BookRoutes = router;
