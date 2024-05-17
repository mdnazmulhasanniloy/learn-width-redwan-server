import { Model } from 'mongoose';

export type ICoupon = {
  couponLabel: string;
  couponCode: string;
  discount: number;
  expireAt: string;
  isActive: boolean;
};

export type ICouponModel = Model<ICoupon, Record<string, unknown>>;
