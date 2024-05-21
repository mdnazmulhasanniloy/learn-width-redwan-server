import { z } from 'zod';

const createCouponZodSchema = z.object({
  body: z.object({
    couponLabel: z.string({ required_error: 'coupon label is required' }),
    discount: z.number({ required_error: 'discount is required' }),
    expireAt: z.string({ required_error: 'expireAt is required' }),
    isActive: z.boolean({ required_error: 'isActive is required' }),
  }),
});

const updateCouponZodSchema = z.object({
  body: z.object({
    couponLabel: z
      .string({ required_error: 'coupon label is required' })
      .optional(),
    couponCode: z
      .string({ required_error: 'coupon code is required' })
      .optional(),
    discount: z.number({ required_error: 'discount is required' }).optional(),
    expireAt: z.string({ required_error: 'expireAt is required' }).optional(),
    isActive: z.boolean({ required_error: 'isActive is required' }).optional(),
  }),
});

export const couponValidations = {
  createCouponZodSchema,
  updateCouponZodSchema,
};
