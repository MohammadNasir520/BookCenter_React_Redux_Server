import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    reviewText: z.string({ required_error: 'title number is required' }),
    user: z.string({ required_error: 'user is required' }),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
};
