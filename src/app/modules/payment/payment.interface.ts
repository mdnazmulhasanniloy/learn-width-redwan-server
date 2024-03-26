import { Model, Types } from 'mongoose';

export type IPayment = {
  id: string;
  amount: number;
  status?: string;
  student: Types.ObjectId;
  transactionId: string;
  paymentGatewayData?: JSON;
};

export type IPaymentModel = Model<IPayment, Record<string, unknown>>;
