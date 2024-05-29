'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Coupon = void 0;
const mongoose_1 = require('mongoose');
const couponSchema = new mongoose_1.Schema(
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
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
