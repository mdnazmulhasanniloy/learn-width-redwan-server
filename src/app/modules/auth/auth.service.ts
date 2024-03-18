import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { User } from '../user/user.models';
import bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../../config';

//login user
const signIn = async (props: ILoginUser): Promise<IUser | null> => {
  const { email, password, deviceIdentifier } = props;

  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'your email or password is incorrect',
    );
  }

  const isPasswordMatch: boolean = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'your email or password is incorrect',
    );
  }
  if (user.loggedInDevice && user.loggedInDevice !== deviceIdentifier) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'User is already logged in from another device',
    );
  }
  const token = jwt.sign({ userId: user._id }, config?.access_token as string, {
    expiresIn: '3d',
  });
  const userId = user?._id;
  const result: IUser | null = await User.findByIdAndUpdate(userId, {
    loggedInDevice: deviceIdentifier,
  });

  return { ...result?._doc, accessToken: token };
};

//sign out
const signOut = async (props: string): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(props, { loggedInDevice: null });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sign out fields');
  }
  return user._doc as IUser;
};

export const AuthService = {
  signIn,
  signOut,
};
