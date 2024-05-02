'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.couponValidations = void 0;
const zod_1 = require('zod');
const createCouponZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    couponLabel: zod_1.z.string({ required_error: 'coupon label is required' }),
    discount: zod_1.z.number({ required_error: 'discount is required' }),
    expireAt: zod_1.z.string({ required_error: 'expireAt is required' }),
  }),
});
const updateCouponZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    couponLabel: zod_1.z
      .string({ required_error: 'coupon label is required' })
      .optional(),
    couponCode: zod_1.z
      .string({ required_error: 'coupon code is required' })
      .optional(),
    discount: zod_1.z
      .number({ required_error: 'discount is required' })
      .optional(),
    expireAt: zod_1.z
      .string({ required_error: 'expireAt is required' })
      .optional(),
  }),
});
exports.couponValidations = {
  createCouponZodSchema,
  updateCouponZodSchema,
};
