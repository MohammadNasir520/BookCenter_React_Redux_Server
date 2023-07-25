import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title number is required' }),
    author: z.string({ required_error: 'author is required' }),
    genre: z.string({ required_error: 'genre is required' }),
    image: z.string({ required_error: 'image is required' }),
    publicationDate: z.string({ required_error: 'date is required' }),
    user: z.string({ required_error: 'user is required' }),
  }),
});

export const bookValidation = {
  createBookZodSchema,
};
