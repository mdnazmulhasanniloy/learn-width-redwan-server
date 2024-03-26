import { model, Schema } from 'mongoose';
import { IPayment, IPaymentModel } from './payment.interface';
import { PaymentStatus } from './payment.constants';

const paymentSchema = new Schema<IPayment>(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: PaymentStatus,
      default: 'pending',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
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

export const Payment = model<IPayment, IPaymentModel>('Payment', paymentSchema);
