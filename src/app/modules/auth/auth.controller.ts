import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { IUserSession } from './auth.interface';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { IUser } from '../user/user.interface';

const signIn = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signIn(req.body);

  (req.session as IUserSession).user = {
    id: (result as IUser)._id,
    email: (result as IUser).email,
  }; // Store user data in session

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successful',
    data: result,
  });
});

const signOut = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signOut(req.body.id);
  if (result?.loggedInDevice === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'sign out filed');
  }
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logout successful',
  });
});

export const AuthController = {
  signIn,
  signOut,
};
