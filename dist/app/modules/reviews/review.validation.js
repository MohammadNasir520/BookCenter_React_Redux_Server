"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        reviewText: zod_1.z.string({ required_error: 'title number is required' }),
        user: zod_1.z.string({ required_error: 'user is required' }),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
};
