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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBook = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const createBook = yield book_model_1.Book.create(BookData);
    return createBook;
});
const getAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(filters);
    const booksSearchableFields = ['title', 'title', 'author', 'genre'];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: booksSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    // const andConditions = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         author: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    // const whereCondition =
    //   andConditions.length > 0 ? { $and: andConditions } : {};
    // console.log(whereCondition);
    const getAllBooks = yield book_model_1.Book.find(whereCondition);
    return getAllBooks;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBooks = yield book_model_1.Book.findById(id);
    return getAllBooks;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleBook = yield book_model_1.Book.findByIdAndDelete(id);
    if (!deleteSingleBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already deleted or not exist');
    }
    return deleteSingleBook;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findOneAndUpdate({
        _id: id,
    }, payload, { new: true });
    return updatedBook;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteSingleBook,
    updateBook,
};
