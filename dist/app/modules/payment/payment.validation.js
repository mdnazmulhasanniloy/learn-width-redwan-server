'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.paymentValidator = void 0;
const zod_1 = require('zod');
const paymentInitZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    amount: zod_1.z.number({ required_error: 'amount is required' }),
    studentName: zod_1.z.string({ required_error: 'student name is required' }),
    studentEmail: zod_1.z.string({
      required_error: 'student email is required',
    }),
    studentAdd: zod_1.z.string({
      required_error: 'student address is required',
    }),
    studentPhone: zod_1.z.string({
      required_error: 'student phone is required',
    }),
    student: zod_1.z.string({ required_error: 'student id is required' }),
  }),
});
exports.paymentValidator = {
  paymentInitZodSchema,
};
