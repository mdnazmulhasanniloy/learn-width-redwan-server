import * as z from 'zod';
import { userRole } from '../user/user.constants';

export const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    role: z.enum([...userRole] as [string, ...string[]]).default('student'),
    isVerified: z
      .boolean({ required_error: 'is verified is required' })
      .default(false),
  }),
});

const signInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }).optional(),
  }),
});

export const AuthValidation = {
  signInZodSchema,
  signUpZodSchema,
};
