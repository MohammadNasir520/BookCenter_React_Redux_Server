"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/create-book', (0, validateRequest_1.validateRequest)(book_validation_1.bookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/', book_controller_1.BookController.getAllBooks);
router.delete('/:id', book_controller_1.BookController.deleteSingleBook);
router.patch('/:id', book_controller_1.BookController.updateBook);
exports.BookRoutes = router;
