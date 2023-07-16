import { Request, Response } from 'express';
import { ReviewService } from './review.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await ReviewService.createReview(userData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const getAllReviews = await ReviewService.getAllReviews();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: getAllReviews,
  });
});
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const getAllReviews = await ReviewService.getSingleReview(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review retrieved successfully',
    data: getAllReviews,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedDAta = req.body;
  const updatedReview = await ReviewService.updateReview(id, updatedDAta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated successfully',
    data: updatedReview,
  });
});

const deleteSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteSingleReview = await ReviewService.deleteSingleReview(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Review deleted successfully',
    data: deleteSingleReview,
  });
});

export const ReviewController = {
  getAllReviews,
  getSingleReview,
  deleteSingleReview,
  updateReview,
  createReview,
};
