import { z } from 'zod';

const paymentInitZodSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: 'amount is required' }),
    studentName: z.string({ required_error: 'student name is required' }),
    studentEmail: z.string({ required_error: 'student email is required' }),
    studentAdd: z.string({ required_error: 'student address is required' }),
    studentPhone: z.string({ required_error: 'student phone is required' }),
    student: z.string({ required_error: 'student id is required' }),
  }),
});

export const paymentValidator = {
  paymentInitZodSchema,
};
