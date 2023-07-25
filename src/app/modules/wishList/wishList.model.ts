import { Schema, model } from 'mongoose';
import { IWishList } from './wishList.interface';

const UserSchema = new Schema<IWishList>(
  {
    status: {
      type: String,
      required: true,
      default: 'not read',
      enum: ['not read', 'reading', 'finished'],
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

export const WishList = model<IWishList>('WishList', UserSchema);
