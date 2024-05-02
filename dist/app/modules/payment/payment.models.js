'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Payment = void 0;
const mongoose_1 = require('mongoose');
const payment_constants_1 = require('./payment.constants');
const paymentSchema = new mongoose_1.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: payment_constants_1.PaymentStatus,
      default: 'pending',
      required: true,
    },
    student: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentGatewayData: {
      type: JSON,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
