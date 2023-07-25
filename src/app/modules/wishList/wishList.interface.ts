import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../books/book.interface';

export type IWishList = {
  status: string;
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};
