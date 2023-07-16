import { Model, Types } from 'mongoose';

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  role: 'user' | 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  image: string;
};

export type UserModel = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<Pick<IUser, '_id' | 'role'>>;
} & Model<IUser>;
