import { Schema, model } from 'mongoose';
import { IBook } from './book.interface';

const UserSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>('Book', UserSchema);
