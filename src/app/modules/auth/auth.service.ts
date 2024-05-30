import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import { User } from '../user/user.models';
import bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { generateStudentId } from '../user/user.utils';

//sign up
const signUp = async (user: IUser): Promise<IUser | null> => {
  if (!user.role) user.role = 'student';

  if (user.role === 'student') {
    const studentId = await generateStudentId();
    user.studentId = studentId;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

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

  if (user?.password) {
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
  }

  // if (!user?.isVerified) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'This email is not verified');
  // }

  // //login device check
  if (user.loggedInDevice && user.loggedInDevice !== deviceIdentifier) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'User is already logged in from another device',
    );
  }

  //jwt sign
  const token = jwt.sign(
    { userId: user._id, email: user?.email },
    config?.access_token as string,
    {
      expiresIn: '15d',
    },
  );

  const userId = user?._id;
  const result: IUser | null = await User.findByIdAndUpdate(
    userId,
    {
      loggedInDevice: deviceIdentifier,
    },
    {
      new: true,
    },
  );

  return {
    ...result?._doc,
    accessToken: token,
  };
};

//sign out
const signOut = async (props: string): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(
    props,
    { loggedInDevice: null },
    { new: true, useFindAndModify: false },
  );
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sign out failed');
  }
  return user.toObject() as IUser;
};

export const AuthService = {
  signUp,
  signIn,
  signOut,
};
