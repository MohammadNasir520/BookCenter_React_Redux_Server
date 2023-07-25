import { IWishList } from './wishList.interface';
import { WishList } from './wishList.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createWishList = async (WishListData: IWishList): Promise<IWishList> => {
  const isExist = await WishList.find(WishListData);
  if (isExist.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'this book already added to wishlist'
    );
  }

  const createWishList = (
    await (await WishList.create(WishListData)).populate('user')
  ).populate('book');

  return createWishList;
};

const getAllWishLists = async () => {
  const getAllWishLists = await WishList.find({})
    .populate('user')
    .populate('book');
  if (getAllWishLists.length <= 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'no WishList found');
  }
  return getAllWishLists;
};
const getSingleWishList = async (id: string, status: any) => {
  if (!status) {
    const getAllWishLists = await WishList.find({ user: id })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('book');

    return getAllWishLists;
  } else if (status) {
    const getAllWishLists = await WishList.find({ user: id, status: status })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('book');

    return getAllWishLists;
  }
};
const deleteSingleWishList = async (id: string) => {
  const deleteSingleWishList = await WishList.findByIdAndDelete(id);
  if (!deleteSingleWishList) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'WishList already deleted or not exist'
    );
  }

  return deleteSingleWishList;
};
const updateWishList = async (id: string, payload: Partial<IWishList>) => {
  const updatedWishList = await WishList.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );
  return updatedWishList;
};

export const WishListService = {
  createWishList,
  getAllWishLists,
  getSingleWishList,
  deleteSingleWishList,
  updateWishList,
};
