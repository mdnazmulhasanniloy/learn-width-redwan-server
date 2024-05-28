import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { generateRandomNumber } from './auth.utils';

//sign up  user
const signUp = CatchAsync(async (req: Request, res: Response) => {
  const user = req?.body;
  const result = await AuthService.signUp(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

//sign in user
const signIn = CatchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
  let SignInData: any = await req.body;
  const deviceIdentifier = await req?.session?.deviceIdentifier;

  if (deviceIdentifier) {
    SignInData.deviceIdentifier = deviceIdentifier;
  } else {
    const newDeviceIdentifier = generateRandomNumber();
    SignInData.deviceIdentifier = newDeviceIdentifier;
  }

  const result = await AuthService.signIn(SignInData);

  if (!result?.accessToken || !result?.loggedInDevice) {
    throw new ApiError(400, 'user login failed');
  }

  req.session = {
    userId: result?._id,
    accessToken: result?.accessToken,
    deviceIdentifier: result?.loggedInDevice,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successful',
    data: result,
  });
});

const signOut = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.session?.userId;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const result = await AuthService.signOut(userId);
  if (!result || result.loggedInDevice !== null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sign out failed');
  }

  req.session = null;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logout successful',
  });
});

export const AuthController = {
  signUp,
  signIn,
  signOut,
};
