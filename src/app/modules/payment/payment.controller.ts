import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { PaymentService } from './payment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const initPayment = CatchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.initPayment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'payment initiated successfully!',
    data: result,
  });
});

const webhook = CatchAsync(async (req: Request, res: Response) => {
  console.log('query', req.query);
  console.log('body', req.body);
  console.log('params', req.params);
  const result = await PaymentService.webhook(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'payment verified successfully!',
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  webhook,
};
