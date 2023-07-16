import { Date, Types } from 'mongoose';

export type IBook = {
  _id?: Types.ObjectId;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  image: string;
};
