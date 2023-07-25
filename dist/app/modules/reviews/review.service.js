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
exports.ReviewService = void 0;
const review_model_1 = require("./review.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createReview = (ReviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const createReview = (yield (yield review_model_1.Review.create(ReviewData)).populate('user')).populate('book');
    return createReview;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllReviews = yield review_model_1.Review.find({}).populate('user').populate('book');
    if (getAllReviews.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'no review found');
    }
    return getAllReviews;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllReviews = yield review_model_1.Review.find({ book: id })
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('book');
    return getAllReviews;
});
const deleteSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleReview = yield review_model_1.Review.findByIdAndDelete(id);
    if (!deleteSingleReview) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Review already deleted or not exist');
    }
    return deleteSingleReview;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield review_model_1.Review.findOneAndUpdate({
        _id: id,
    }, payload, { new: true });
    return updatedReview;
});
exports.ReviewService = {
    createReview,
    getAllReviews,
    getSingleReview,
    deleteSingleReview,
    updateReview,
};
