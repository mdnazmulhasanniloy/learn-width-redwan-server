import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { SslService } from '../ssl/ssl.service';
import { IPayment } from './payment.interface';
import { Payment } from './payment.models';
import { getTranId } from './payment.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initPayment = async (payload: any) => {
  const tranId = await getTranId();

  const data = {
    total_amount: payload.amount,
    tran_id: tranId,
    cus_name: payload.studentName,
    cus_email: payload.studentEmail,
    cus_add1: payload.studentAdd,
    cus_phone: payload.studentPhone,
    student: payload.student,
  };

  const paymentSessionData: IPayment = {
    amount: payload.amount,
    student: payload.student,
    transactionId: tranId,
    id: tranId,
  };

  await Payment.create(paymentSessionData);

  const paymentSession = await SslService.initPayment(data);
  if (!paymentSession.redirectGatewayURL) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to initiate payment');
  }
  return paymentSession.redirectGatewayURL;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webhook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid Payment');
  }

  const result = await SslService.validate(payload);

  if (result?.status !== 'VALID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid Payment');
  }

  const { tran_id } = result;
  await Payment.updateOne(
    { tran_id },
    {
      status: 'paid',
      paymentGatewayData: payload,
    },
  );
  return result;
};
export const PaymentService = {
  initPayment,
  webhook,
};
