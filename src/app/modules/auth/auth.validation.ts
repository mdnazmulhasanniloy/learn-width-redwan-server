import { z } from 'zod';

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    deviceIdentifier: z.string({
      required_error: 'device identity is required',
    }),
  }),
});

export const AuthValidation = {
  loginUserZodSchema,
};
