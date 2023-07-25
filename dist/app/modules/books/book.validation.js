"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title number is required' }),
        author: zod_1.z.string({ required_error: 'author is required' }),
        genre: zod_1.z.string({ required_error: 'genre is required' }),
        image: zod_1.z.string({ required_error: 'image is required' }),
        publicationDate: zod_1.z.string({ required_error: 'date is required' }),
        user: zod_1.z.string({ required_error: 'user is required' }),
    }),
});
exports.bookValidation = {
    createBookZodSchema,
};
