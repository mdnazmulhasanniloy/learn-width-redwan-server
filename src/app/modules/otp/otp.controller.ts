import httpStatus from 'http-status';
import { otpServices } from './otp.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.token;

  const result = await otpServices.verifyOtp(token as string, req.body.otp);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'otp verified successfully',
    data: result,
  });
});

const resendOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await otpServices.resendOtp(req.body.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'otp sent successfully',
    data: result,
  });
});

export const otpControllers = {
  verifyOtp,
  resendOtp,
};
