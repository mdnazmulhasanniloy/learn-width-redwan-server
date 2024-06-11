import { Request, Response } from 'express';
import { authServices } from './auth.service';
import httpStatus from 'http-status';
import CatchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';

//login
const login = CatchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);
  const { refreshToken } = result;
  const cookieOptions = {
    secure: false,
    httpOnly: true,
    // maxAge: parseInt(config.jwt.refresh_expires_in || '31536000000'),
    maxAge: 31536000000,
  };

  if (config.nod_env === 'production') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cookieOptions.sameSite = 'none';
  }
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: result,
  });
});

//change password
const changePassword = CatchAsync(async (req: Request, res: Response) => {
  const result = await authServices.changePassword(req?.user?.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successfully',
    data: result,
  });
});

//forgot password
const forgotPassword = CatchAsync(async (req: Request, res: Response) => {
  const result = await authServices.forgotPassword(req?.body?.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An otp sent to your email!',
    data: result,
  });
});

// reset Password
const resetPassword = CatchAsync(async (req: Request, res: Response) => {
  const result = await authServices.resetPassword(
    req?.headers?.token as string,
    req?.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

//refresh token
const refreshToken = CatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  });
});

export const authControllers = {
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
};

// import { Request, Response } from 'express';
// import CatchAsync from '../../../shared/catchAsync';
// import { AuthService } from './auth.service';
// import sendResponse from '../../../shared/sendResponse';
// import httpStatus from 'http-status';
// import ApiError from '../../../errors/api.error';
// import { generateRandomNumber } from './auth.utils';

// //sign up  user
// const signUp = CatchAsync(async (req: Request, res: Response) => {
//   const user = req?.body;
//   const result = await AuthService.signUp(user);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'user created successfully!',
//     data: result,
//   });
// });

// //sign in user
// const signIn = CatchAsync(async (req: Request, res: Response) => {
//   // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
//   let SignInData: any = await req.body;
//   const deviceIdentifier = await req?.session?.deviceIdentifier;

//   if (deviceIdentifier) {
//     SignInData.deviceIdentifier = deviceIdentifier;
//   } else {
//     const newDeviceIdentifier = generateRandomNumber();
//     SignInData.deviceIdentifier = newDeviceIdentifier;
//   }

//   const result = await AuthService.signIn(SignInData);

//   if (!result?.accessToken || !result?.loggedInDevice) {
//     throw new ApiError(400, 'user login failed');
//   }

//   if (req.session) {
//     req.session.userId = result._id;
//     req.session.accessToken = result.accessToken;
//     req.session.deviceIdentifier = result.loggedInDevice;
//   }

//   // console.log(req.session);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'user login successful',
//     data: result,
//   });
// });

// const signOut = CatchAsync(async (req: Request, res: Response) => {
//   const userId = req.session?.userId;

//   if (!userId) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
//   }

//   const result = await AuthService.signOut(userId);
//   if (!result || result.loggedInDevice !== null) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Sign out failed');
//   }

//   res.clearCookie('connect.sid');

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User logout successful',
//   });
// });

// export const AuthController = {
//   signUp,
//   signIn,
//   signOut,
// };
