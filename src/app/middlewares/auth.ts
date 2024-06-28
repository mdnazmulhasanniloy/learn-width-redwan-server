import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import CatchAsync from '../../shared/catchAsync';
import ApiError from '../../errors/api.error';
import config from '../../config';
import { User } from '../modules/user/user.models';
const auth = (...userRoles: string[]) => {
  return CatchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      console.log('error from here', token);
      throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized!');
    }
    let decode;
    try {
      decode = jwt.verify(token, config.access_token as string) as JwtPayload;
    } catch (err) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized');
    }
    const { role, userId } = decode;
    const isUserExist = User.IsUserExistById(userId);
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
    }
    if (userRoles && !userRoles.includes(role)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decode;
    next();
  });
};
export default auth;
