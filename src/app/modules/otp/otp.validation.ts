import { z } from 'zod';

const verifyOtpZodSchema = z.object({
  body: z.object({
    otp: z
      .string({ required_error: 'otp is required' })
      .length(4, { message: 'otp must be exactly 4 characters long' }),
  }),
});

const resentOtpZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
});

export const resentOtpValidations = {
  resentOtpZodSchema,
  verifyOtpZodSchema,
};
