"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishList_controller_1 = require("./wishList.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const wishList_validation_1 = require("./wishList.validation");
const router = express_1.default.Router();
router.post('/create-WishList', (0, validateRequest_1.validateRequest)(wishList_validation_1.WishListValidation.createWishListZodSchema), wishList_controller_1.WishListController.createWishList);
router.get('/', wishList_controller_1.WishListController.getAllWishLists);
router.get('/:id', wishList_controller_1.WishListController.getSingleWishList);
router.delete('/:id', wishList_controller_1.WishListController.deleteSingleWishList);
router.patch('/:id', wishList_controller_1.WishListController.updateWishList);
exports.WishListRoutes = router;
