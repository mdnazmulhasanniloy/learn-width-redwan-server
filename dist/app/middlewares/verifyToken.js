'use strict';
/*import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../../errors/api.error';
import httpStatus from 'http-status';
import config from '../../config';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized access');
  }

  jwt.verify(token, config.access_token as string, (err, decoded) => {
    if (err) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid token');
    }
    req.id = (decoded as { id: string }).id;
    next();
  });
};
*/
