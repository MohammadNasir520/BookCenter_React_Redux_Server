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
exports.WishListController = void 0;
const wishList_service_1 = require("./wishList.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield wishList_service_1.WishListService.createWishList(userData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'WishList created successfully',
        data: result,
    });
}));
const getAllWishLists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllWishLists = yield wishList_service_1.WishListService.getAllWishLists();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'WishLists retrieved successfully',
        data: getAllWishLists,
    });
}));
const getSingleWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getAllWishLists = yield wishList_service_1.WishListService.getSingleWishList(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'WishList retrieved successfully',
        data: getAllWishLists,
    });
}));
const updateWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedDAta = req.body;
    const updatedWishList = yield wishList_service_1.WishListService.updateWishList(id, updatedDAta);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'WishList updated successfully',
        data: updatedWishList,
    });
}));
const deleteSingleWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteSingleWishList = yield wishList_service_1.WishListService.deleteSingleWishList(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'WishList deleted successfully',
        data: deleteSingleWishList,
    });
}));
exports.WishListController = {
    getAllWishLists,
    getSingleWishList,
    deleteSingleWishList,
    updateWishList,
    createWishList,
};
