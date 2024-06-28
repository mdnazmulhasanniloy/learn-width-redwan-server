import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { createToken, verifyToken } from './auth.utils';
import moment from 'moment';
import { User } from '../user/user.models';
import httpStatus from 'http-status';
import ApiError from '../../../errors/api.error';
import config from '../../../config';
import bcrypt from 'bcrypt';
import { TchangePassword, Tlogin, TresetPassword } from './auth.interface';
import { generateOtp } from '../../util/otpGenerator';
import { sendEmail } from '../../util/mailSender';
import { IUser } from '../user/user.interface';

const login = async (payload: Tlogin) => {
  const user = await User.isUserExist(payload?.email);
  console.log(user);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  if (!user?.isVerified) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This user is not verified');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password do not match');
  }

  // //login device check
  if (
    user.loggedInDevice &&
    user.loggedInDevice !== payload?.deviceIdentifier
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'User is already logged in from another device',
    );
  }

  const userId = user?._id;
  const result: Partial<IUser | null> = await User.findByIdAndUpdate(
    userId,
    {
      loggedInDevice: payload?.deviceIdentifier,
    },
    {
      new: true,
    },
  );

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Oops! login failed');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jwtPayload: any = {
    userId: result?._id,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token as string,
    config.access_token_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refers_token as string,
    config.refers_token_expires as string,
  );

  return {
    deviceIdentifier: result?.loggedInDevice,
    accessToken,
    refreshToken,
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

//clear session
const clearSession = async (props: {
  email: string;
  deviceIdentifier: string;
}) => {
  const user = await User.findOneAndUpdate(
    { email: props?.email },
    { loggedInDevice: props?.deviceIdentifier },
    { new: true, useFindAndModify: false },
  );

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'session clarion failed');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jwtPayload: any = {
    userId: user?._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token as string,
    config.access_token_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refers_token as string,
    config.refers_token_expires as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// change password
const changePassword = async (id: string, payload: TchangePassword) => {
  const user = await User.IsUserExistById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await User.isPasswordMatched(payload?.oldPassword, user.password))) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Old password do not match!');
  }
  if (payload?.newPassword !== payload?.confirmPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'New password and confirm password do not match!',
    );
  }
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    },
    { new: true },
  );

  return result;
};

// forgot password
const forgotPassword = async (email: string) => {
  const user = await User.isUserExist(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found ');
  }
  // if (user?.isDeleted) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  // }
  // if (user?.status === 'blocked') {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'your account is inactive');
  // }
  const jwtPayload = {
    email: email,
    id: user?._id,
  };
  const token = jwt.sign(jwtPayload, config.access_token as Secret, {
    expiresIn: '2m',
  });
  const currentTime = new Date();
  const otp = generateOtp();
  const expiresAt = moment(currentTime).add(2, 'minute');
  await User.findByIdAndUpdate(user?._id, {
    verification: {
      otp,
      expiresAt,
    },
  });
  await sendEmail(
    email,
    'your reset password otp is:',
    `<div><h5>your otp is: ${otp}</h5>
    <p>valid for:${expiresAt.toLocaleString()}</p>
    </div>`,
  );
  // send the mail here
  return { email, token };
};

const resetPassword = async (token: string, payload: TresetPassword) => {
  console.log(token, payload);
  let decode;
  try {
    decode = jwt.verify(token, config.access_token as string) as JwtPayload;
  } catch (err) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Session has expired. please try again',
    );
  }
  const user = await User.findById(decode?.id).select('isDeleted verification');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (new Date() > user?.verification?.expiresAt) {
    throw new ApiError(httpStatus.FORBIDDEN, 'sessions expired');
  }
  if (!user?.verification?.status) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Otp is not verified yet!');
  }
  if (payload?.newPassword !== payload?.confirmPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'New password and Confirm password do not match!',
    );
  }
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await User.findByIdAndUpdate(decode?.id, {
    password: hashedPassword,
    passwordChangedAt: new Date(),
    verification: {
      otp: 0,
      status: false,
    },
  });
  return result;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.refers_token as string);
  const { userId } = decoded;
  const user = await User.IsUserExistById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }
  // checking if the user is blocked
  // const userStatus = user?.status;

  // if (userStatus === 'blocked') {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jwtPayload: any = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.refers_token as string,
    config.refers_token_expires as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  login,
  signOut,
  clearSession,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
};
