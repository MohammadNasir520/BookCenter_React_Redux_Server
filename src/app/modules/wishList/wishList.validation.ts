import { z } from 'zod';

const createWishListZodSchema = z.object({
  body: z.object({
    status: z
      .string({
        required_error:
          'status is required and must be "not read", "reading" or "finished"',
      })
      .optional(),
    book: z.string({ required_error: 'book  is required' }),
    user: z.string({ required_error: 'user is required' }),
  }),
});

export const WishListValidation = {
  createWishListZodSchema,
};
