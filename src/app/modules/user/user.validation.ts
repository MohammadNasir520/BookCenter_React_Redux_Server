import { z } from 'zod';

const UserSignUpZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'phone number is required' }),
    role: z
      .enum(['user', 'admin'], {
        required_error: 'role is required and must be seller or buyer',
      })
      .optional(),
    password: z.string({ required_error: 'password is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required' }),
      lastName: z.string({ required_error: 'Last Name is required' }),
    }),
    image: z.string({ required_error: 'image is required' }),
  }),
});

export const userValidation = {
  UserSignUpZodSchema,
};
