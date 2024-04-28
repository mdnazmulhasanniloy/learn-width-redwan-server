import * as z from 'zod';
import { userRole } from '../user/user.constants';

export const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    role: z.enum([...userRole] as [string, ...string[]]).default('student'),
  }),
});

const signInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    deviceIdentifier: z.string({
      required_error: 'device identity is required',
    }),
  }),
});

export const AuthValidation = {
  signInZodSchema,
  signUpZodSchema,
};
