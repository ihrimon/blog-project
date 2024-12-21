import { z } from 'zod';

// validation schema for user creation
export const createUserSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    }),
    email: z.string().email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password must not exceed 20 characters' }),
  }),
});

// validationi schema for user login
export const loginUserValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Password is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
