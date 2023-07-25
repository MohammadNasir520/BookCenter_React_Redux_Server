"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListValidation = void 0;
const zod_1 = require("zod");
const createWishListZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string({ required_error: 'status number is required' }),
        book: zod_1.z.string({ required_error: 'book number is required' }),
        user: zod_1.z.string({ required_error: 'user is required' }),
    }),
});
exports.WishListValidation = {
    createWishListZodSchema,
};
