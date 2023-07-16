import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  reviewText: string;
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IReview;
};
