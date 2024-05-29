import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import ApiError from '../../errors/api.error';
import httpStatus from 'http-status';
import config from '../../config';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.session?.accessToken;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'access forbidden');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, config.access_token as string, (err, decoded: any) => {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid token');
      }

      req.id = decoded?.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
