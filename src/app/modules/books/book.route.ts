import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);
router.delete('/:id', BookController.deleteSingleBook);
router.patch('/:id', BookController.updateBook);

export const BookRoutes = router;
