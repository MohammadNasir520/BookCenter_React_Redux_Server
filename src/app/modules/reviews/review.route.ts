import express from 'express';
import { ReviewController } from './review.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);
router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getSingleReview);
router.delete('/:id', ReviewController.deleteSingleReview);
router.patch('/:id', ReviewController.updateReview);

export const ReviewRoutes = router;
