import { Model } from 'mongoose';

export type ICoupon = {
  couponLabel: string;
  couponCode: string;
  discount: number;
  expireAt: string;
};

export type ICouponModel = Model<ICoupon, Record<string, unknown>>;
