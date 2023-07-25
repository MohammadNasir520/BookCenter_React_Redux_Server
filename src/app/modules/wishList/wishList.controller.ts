import { Request, Response } from 'express';
import { WishListService } from './wishList.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createWishList = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  console.log('userdata', userData);

  const result = await WishListService.createWishList(userData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'WishList created successfully',
    data: result,
  });
});

const getAllWishLists = catchAsync(async (req: Request, res: Response) => {
  const getAllWishLists = await WishListService.getAllWishLists();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'WishLists retrieved successfully',
    data: getAllWishLists,
  });
});
const getSingleWishList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.query;
  console.log(status);
  const getAllWishLists = await WishListService.getSingleWishList(id, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'WishList retrieved successfully',
    data: getAllWishLists,
  });
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedDAta = req.body;
  console.log('u', updatedDAta, id);

  const updatedWishList = await WishListService.updateWishList(id, updatedDAta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'WishList updated successfully',
    data: updatedWishList,
  });
});

const deleteSingleWishList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteSingleWishList = await WishListService.deleteSingleWishList(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'WishList deleted successfully',
    data: deleteSingleWishList,
  });
});

export const WishListController = {
  getAllWishLists,
  getSingleWishList,
  deleteSingleWishList,
  updateWishList,
  createWishList,
};
