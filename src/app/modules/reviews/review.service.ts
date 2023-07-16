import { IReview } from './review.interface';
import { Review } from './review.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createReview = async (ReviewData: IReview): Promise<IReview> => {
  const createReview = (
    await (await Review.create(ReviewData)).populate('user')
  ).populate('book');

  return createReview;
};

const getAllReviews = async () => {
  const getAllReviews = await Review.find({}).populate('user').populate('book');
  if (getAllReviews.length <= 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'no review found');
  }
  return getAllReviews;
};
const getSingleReview = async (id: string) => {
  const getAllReviews = await Review.find({ book: id })
    .populate('user')
    .populate('book');
  console.log(getAllReviews);
  return getAllReviews;
};
const deleteSingleReview = async (id: string) => {
  const deleteSingleReview = await Review.findByIdAndDelete(id);
  if (!deleteSingleReview) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Review already deleted or not exist'
    );
  }

  return deleteSingleReview;
};
const updateReview = async (id: string, payload: Partial<IReview>) => {
  const updatedReview = await Review.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );
  return updatedReview;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  deleteSingleReview,
  updateReview,
};
