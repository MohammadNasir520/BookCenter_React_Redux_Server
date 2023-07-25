import express from 'express';
import { WishListController } from './wishList.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { WishListValidation } from './wishList.validation';

const router = express.Router();

router.post(
  '/create-WishList',
  validateRequest(WishListValidation.createWishListZodSchema),
  WishListController.createWishList
);
router.get('/', WishListController.getAllWishLists);
router.get('/:id', WishListController.getSingleWishList);
router.delete('/:id', WishListController.deleteSingleWishList);
router.patch('/:id', WishListController.updateWishList);

export const WishListRoutes = router;
