import { model, Schema } from 'mongoose';
import { ICoupon, ICouponModel } from './coupon.interface';

const couponSchema = new Schema<ICoupon>(
  {
    couponLabel: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Coupon = model<ICoupon, ICouponModel>('Coupon', couponSchema);
