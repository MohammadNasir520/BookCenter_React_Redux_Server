"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListService = void 0;
const wishList_model_1 = require("./wishList.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createWishList = (WishListData) => __awaiter(void 0, void 0, void 0, function* () {
    const createWishList = (yield (yield wishList_model_1.WishList.create(WishListData)).populate('user')).populate('book');
    return createWishList;
});
const getAllWishLists = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllWishLists = yield wishList_model_1.WishList.find({})
        .populate('user')
        .populate('book');
    if (getAllWishLists.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'no WishList found');
    }
    return getAllWishLists;
});
const getSingleWishList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllWishLists = yield wishList_model_1.WishList.find({ book: id })
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('book');
    return getAllWishLists;
});
const deleteSingleWishList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleWishList = yield wishList_model_1.WishList.findByIdAndDelete(id);
    if (!deleteSingleWishList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'WishList already deleted or not exist');
    }
    return deleteSingleWishList;
});
const updateWishList = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWishList = yield wishList_model_1.WishList.findOneAndUpdate({
        _id: id,
    }, payload, { new: true });
    return updatedWishList;
});
exports.WishListService = {
    createWishList,
    getAllWishLists,
    getSingleWishList,
    deleteSingleWishList,
    updateWishList,
};
