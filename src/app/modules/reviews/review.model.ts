import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const UserSchema = new Schema<IReview>(
  {
    reviewText: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview>('Review', UserSchema);
